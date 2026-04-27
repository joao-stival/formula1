import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RaceService, F1_RACES_2025 } from '../../services/race.service';

@Component({
    selector: 'app-cadastro-corridas',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './cadastro-corridas.component.html',
    styleUrls: ['./cadastro-corridas.component.scss']
})
export class CadastroCorridasComponent {
    form: FormGroup;
    loading = false;
    loadingBulk = false;
    mensagem = '';
    tipoMensagem: 'sucesso' | 'erro' = 'sucesso';
    bulkProgresso = 0;
    bulkTotal = F1_RACES_2025.length;
    imagePreview = '';

    constructor(
        private fb: FormBuilder,
        private raceService: RaceService
    ) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            circuit: ['', [Validators.required, Validators.minLength(3)]],
            country: ['', [Validators.required, Validators.maxLength(2)]],
            city: ['', [Validators.required]],
            round: [null, [Validators.required, Validators.min(1)]],
            laps: [null, [Validators.required, Validators.min(1)]],
            date: ['', [Validators.required]],
            image: [''],
        });
    }

    isFieldInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        this.mensagem = '';

        this.raceService.create(this.form.value).subscribe({
            next: () => {
                this.loading = false;
                this.mostrarMensagem('Corrida cadastrada com sucesso!', 'sucesso');
                this.form.reset();
            },
            error: (err) => {
                this.loading = false;
                this.mostrarMensagem(err.error?.message || 'Erro ao cadastrar corrida.', 'erro');
            }
        });
    }

    cadastrarCalendario(): void {
        this.loadingBulk = true;
        this.bulkProgresso = 0;
        this.mensagem = '';

        const requests = F1_RACES_2025.map(race => this.raceService.create(race));

        forkJoin(requests).subscribe({
            next: (results) => {
                this.loadingBulk = false;
                this.bulkProgresso = results.length;
                this.mostrarMensagem(`${results.length} corridas do calendário 2025 cadastradas com sucesso!`, 'sucesso');
            },
            error: (err) => {
                this.loadingBulk = false;
                this.mostrarMensagem(err.error?.message || 'Erro ao cadastrar calendário.', 'erro');
            }
        });
    }

    onImageChange(): void {
        const value = this.form.get('image')?.value || '';
        this.imagePreview = value.startsWith('http') || value.startsWith('/') ? value : '';
    }

    resetForm(): void {
        this.form.reset();
        this.mensagem = '';
        this.imagePreview = '';
    }

    private mostrarMensagem(msg: string, tipo: 'sucesso' | 'erro'): void {
        this.mensagem = msg;
        this.tipoMensagem = tipo;
        setTimeout(() => this.mensagem = '', 4000);
    }
}
