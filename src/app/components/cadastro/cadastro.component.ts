import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]]
      },
      {
        validators: this.senhasIguais
      }
    );
  }

  senhasIguais(form: AbstractControl) {
    const senha = form.get('senha')?.value;
    const confirmar = form.get('confirmarSenha')?.value;

    return senha === confirmar ? null : { senhaDiferente: true };
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const resultado = this.loginService.cadastrar(this.cadastroForm.value);
      alert(resultado.mensagem);
      if (resultado.sucesso) {
        this.router.navigate(['/login']);
        this.cadastroForm.reset();
      }
    } else {
      this.cadastroForm.markAllAsTouched();
      alert('Por favor, corrija os erros no formulário antes de enviar.');
    }
  }
}