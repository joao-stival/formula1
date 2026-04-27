import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { DriversService } from '../../services/drivers.service';
import { TeamsService, Team } from '../../services/team.service';

interface BulkResult {
    name: string;
    status: 'sucesso' | 'erro';
    message?: string;
}

@Component({
    selector: 'app-cadastro-pilotos',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './cadastro-pilotos.component.html',
    styleUrls: ['./cadastro-pilotos.component.scss']
})
export class CadastroPilotosComponent implements OnInit {
    pilotoForm: FormGroup;
    teams: Team[] = [];
    loadingTeams = false;
    loading = false;
    loadingBulk = false;
    mensagem = '';
    tipoMensagem = '';
    bulkResultados: BulkResult[] = [];
    mostrarResultados = false;

    constructor(
        private fb: FormBuilder,
        private driversService: DriversService,
        private teamsService: TeamsService,
        private router: Router
    ) {
        this.pilotoForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            team_id: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.carregarTimes();
    }

    carregarTimes(): void {
        this.loadingTeams = true;
        this.teamsService.getAll().subscribe({
            next: (teams) => {
                this.teams = teams;
                this.loadingTeams = false;
            },
            error: () => {
                this.loadingTeams = false;
                this.tipoMensagem = 'erro';
                this.mensagem = 'Não foi possível carregar os times. Verifique se a API está ativa.';
            }
        });
    }

    isFieldInvalid(field: string): boolean {
        const control = this.pilotoForm.get(field);
        return !!(control && control.invalid && control.touched);
    }

    onSubmit(): void {
        if (this.pilotoForm.valid) {
            this.loading = true;
            this.mensagem = '';

            const payload = {
                name: this.pilotoForm.value.name,
                team_id: Number(this.pilotoForm.value.team_id)
            };

            this.driversService.create(payload).subscribe({
                next: () => {
                    this.loading = false;
                    this.tipoMensagem = 'sucesso';
                    this.mensagem = 'Piloto cadastrado com sucesso!';
                    this.pilotoForm.reset();
                    setTimeout(() => this.mensagem = '', 3000);
                },
                error: (error) => {
                    this.loading = false;
                    this.tipoMensagem = 'erro';
                    this.mensagem = error.error?.message || 'Erro ao cadastrar o piloto. Tente novamente.';
                }
            });
        } else {
            this.pilotoForm.markAllAsTouched();
            this.tipoMensagem = 'erro';
            this.mensagem = 'Por favor, corrija os erros no formulário.';
        }
    }

    cadastrarTodos(): void {
        if (this.teams.length === 0) {
            this.tipoMensagem = 'erro';
            this.mensagem = 'Nenhum time carregado. Verifique se a API está ativa e os times estão cadastrados.';
            return;
        }

        this.loadingBulk = true;
        this.mensagem = '';
        this.bulkResultados = [];
        this.mostrarResultados = false;

        const drivers = this.driversService.getDrivers();

        const requests: Observable<BulkResult>[] = drivers.map(driver => {
            const team = this.teams.find(
                t => t.name.toLowerCase().trim() === driver.team.toLowerCase().trim()
            );

            if (!team || team.id === undefined) {
                return of<BulkResult>({
                    name: driver.name,
                    status: 'erro',
                    message: `Time "${driver.team}" não encontrado no banco de dados.`
                });
            }

            return new Observable<BulkResult>(observer => {
                this.driversService.create({ name: driver.name, team_id: team.id! }).subscribe({
                    next: () => {
                        observer.next({ name: driver.name, status: 'sucesso' });
                        observer.complete();
                    },
                    error: (err) => {
                        observer.next({
                            name: driver.name,
                            status: 'erro',
                            message: err.error?.message || 'Erro ao cadastrar.'
                        });
                        observer.complete();
                    }
                });
            });
        });

        forkJoin(requests).subscribe({
            next: (resultados) => {
                this.loadingBulk = false;
                this.bulkResultados = resultados;
                this.mostrarResultados = true;

                const erros = resultados.filter(r => r.status === 'erro').length;
                const sucessos = resultados.filter(r => r.status === 'sucesso').length;

                if (erros === 0) {
                    this.tipoMensagem = 'sucesso';
                    this.mensagem = `${sucessos} pilotos cadastrados com sucesso!`;
                } else if (sucessos === 0) {
                    this.tipoMensagem = 'erro';
                    this.mensagem = `Falha ao cadastrar os pilotos. Verifique os erros abaixo.`;
                } else {
                    this.tipoMensagem = 'aviso';
                    this.mensagem = `${sucessos} cadastrado(s) com sucesso, ${erros} com erro.`;
                }
            },
            error: () => {
                this.loadingBulk = false;
                this.tipoMensagem = 'erro';
                this.mensagem = 'Erro inesperado ao cadastrar pilotos.';
            }
        });
    }

    resetForm(): void {
        this.pilotoForm.reset();
        this.mensagem = '';
        this.bulkResultados = [];
        this.mostrarResultados = false;
    }

    voltar(): void {
        this.router.navigate(['/home']);
    }
}
