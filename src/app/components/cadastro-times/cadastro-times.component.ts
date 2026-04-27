import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-times',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-times.component.html',
  styleUrls: ['./cadastro-times.component.scss']
})
export class CadastroTimesComponent {
  timesForm: FormGroup;
  loading = false;
  mensagem = '';
  tipoMensagem = '';
  logoPreview = '';
  logoType: 'local' | 'url' = 'local';

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private router: Router
  ) {
    this.timesForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      logo: ['', [Validators.required]],
      color: ['#000000', [Validators.required]]
    });
  }

  validarLogo() {
    const logo = this.timesForm.get('logo')?.value || '';

    // Aceita URLs que começam com http/https
    if (logo.startsWith('http://') || logo.startsWith('https://')) {
      this.logoType = 'url';
      this.logoPreview = logo;
      this.timesForm.get('logo')?.setErrors(null);
      return true;
    }

    // Aceita caminhos locais que começam com /
    if (logo.startsWith('/')) {
      this.logoType = 'local';
      this.logoPreview = logo;
      this.timesForm.get('logo')?.setErrors(null);
      return true;
    }

    // Aceita caminhos relativos como logos/file.png
    if (logo && !logo.startsWith(' ')) {
      this.logoType = 'local';
      this.logoPreview = `/${logo}`;
      this.timesForm.get('logo')?.setErrors(null);
      return true;
    }

    this.logoPreview = '';
    return false;
  }

  onLogoChange() {
    this.validarLogo();
  }

  onSubmit() {
    if (this.timesForm.valid && this.validarLogo()) {
      this.loading = true;
      this.mensagem = '';

      this.teamsService.create(this.timesForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.tipoMensagem = 'sucesso';
          this.mensagem = 'Time cadastrado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
          this.timesForm.reset();
          this.logoPreview = '';
        },
        error: (error) => {
          this.loading = false;
          this.tipoMensagem = 'erro';
          this.mensagem = error.error?.message || 'Erro ao cadastrar o time. Tente novamente.';
        }
      });
    } else {
      this.timesForm.markAllAsTouched();
      this.tipoMensagem = 'erro';
      this.mensagem = 'Por favor, corrija os erros no formulário.';
    }
  }

  resetForm() {
    this.timesForm.reset();
    this.mensagem = '';
    this.logoPreview = '';
  }

  get controls() {
    return this.timesForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.timesForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
