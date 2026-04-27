import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { TeamsService, Team } from '../../services/team.service';
import { DriversService, ApiDriver } from '../../services/drivers.service';
import { RaceService, Race } from '../../services/race.service';

@Component({
    selector: 'app-gerenciar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './gerenciar.component.html',
    styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {
    aba: 'times' | 'pilotos' | 'corridas' = 'times';

    times: Team[] = [];
    pilotos: ApiDriver[] = [];
    corridas: Race[] = [];

    loadingTimes = false;
    loadingPilotos = false;
    loadingCorridas = false;

    confirmandoId: number | null = null;
    confirmandoTipo: 'time' | 'piloto' | 'corrida' | null = null;
    confirmandoTudo = false;

    mensagem = '';
    tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

    constructor(
        private teamsService: TeamsService,
        private driversService: DriversService,
        private raceService: RaceService
    ) { }

    ngOnInit(): void {
        this.carregarTimes();
        this.carregarPilotos();
        this.carregarCorridas();
    }

    carregarTimes(): void {
        this.loadingTimes = true;
        this.teamsService.getAll().subscribe({
            next: (data) => { this.times = data; this.loadingTimes = false; },
            error: () => { this.loadingTimes = false; }
        });
    }

    carregarPilotos(): void {
        this.loadingPilotos = true;
        this.driversService.getAll().subscribe({
            next: (data) => { this.pilotos = data; this.loadingPilotos = false; },
            error: () => { this.loadingPilotos = false; }
        });
    }

    carregarCorridas(): void {
        this.loadingCorridas = true;
        this.raceService.getAll().subscribe({
            next: (data) => { this.corridas = data; this.loadingCorridas = false; },
            error: () => { this.loadingCorridas = false; }
        });
    }

    confirmarExclusao(id: number, tipo: 'time' | 'piloto' | 'corrida'): void {
        this.confirmandoId = id;
        this.confirmandoTipo = tipo;
    }

    cancelarExclusao(): void {
        this.confirmandoId = null;
        this.confirmandoTipo = null;
        this.confirmandoTudo = false;
    }

    confirmarExclusaoTudo(tipo: 'time' | 'piloto' | 'corrida'): void {
        this.confirmandoTudo = true;
        this.confirmandoTipo = tipo;
    }

    excluir(): void {
        if (this.confirmandoId === null || this.confirmandoTipo === null) return;

        const id = this.confirmandoId;
        const tipo = this.confirmandoTipo;
        this.confirmandoId = null;
        this.confirmandoTipo = null;

        if (tipo === 'time') {
            this.teamsService.delete(id).subscribe({
                next: () => {
                    this.times = this.times.filter(t => t.id !== id);
                    this.mostrarMensagem('Time excluído com sucesso!', 'sucesso');
                },
                error: (err) => {
                    this.mostrarMensagem(err.error?.message || 'Erro ao excluir o time.', 'erro');
                }
            });
        } else if (tipo === 'piloto') {
            this.driversService.delete(id).subscribe({
                next: () => {
                    this.pilotos = this.pilotos.filter(p => p.id !== id);
                    this.mostrarMensagem('Piloto excluído com sucesso!', 'sucesso');
                },
                error: (err) => {
                    this.mostrarMensagem(err.error?.message || 'Erro ao excluir o piloto.', 'erro');
                }
            });
        } else {
            this.raceService.delete(id).subscribe({
                next: () => {
                    this.corridas = this.corridas.filter(c => c.id !== id);
                    this.mostrarMensagem('Corrida excluída com sucesso!', 'sucesso');
                },
                error: (err) => {
                    this.mostrarMensagem(err.error?.message || 'Erro ao excluir a corrida.', 'erro');
                }
            });
        }
    }

    excluirTudo(): void {
        if (!this.confirmandoTipo) return;

        const tipo = this.confirmandoTipo;
        this.confirmandoTudo = false;
        this.confirmandoTipo = null;

        if (tipo === 'time') {
            const requests = this.times.map(t => this.teamsService.delete(t.id!));
            forkJoin(requests).subscribe({
                next: () => {
                    this.times = [];
                    this.mostrarMensagem('Todos os times foram excluídos!', 'sucesso');
                },
                error: (err) => {
                    this.mostrarMensagem(err.error?.message || 'Erro ao excluir todos os times.', 'erro');
                    this.carregarTimes();
                }
            });
        } else if (tipo === 'piloto') {
            const requests = this.pilotos.map(p => this.driversService.delete(p.id));
            forkJoin(requests).subscribe({
                next: () => {
                    this.pilotos = [];
                    this.mostrarMensagem('Todos os pilotos foram excluídos!', 'sucesso');
                },
                error: (err) => {
                    this.mostrarMensagem(err.error?.message || 'Erro ao excluir todos os pilotos.', 'erro');
                    this.carregarPilotos();
                }
            });
        } else {
            const requests = this.corridas.map(c => this.raceService.delete(c.id!));
            forkJoin(requests).subscribe({
                next: () => {
                    this.corridas = [];
                    this.mostrarMensagem('Todas as corridas foram excluídas!', 'sucesso');
                },
                error: (err) => {
                    this.mostrarMensagem(err.error?.message || 'Erro ao excluir todas as corridas.', 'erro');
                    this.carregarCorridas();
                }
            });
        }
    }

    private mostrarMensagem(msg: string, tipo: 'sucesso' | 'erro'): void {
        this.mensagem = msg;
        this.tipoMensagem = tipo;
        setTimeout(() => this.mensagem = '', 3500);
    }
}
