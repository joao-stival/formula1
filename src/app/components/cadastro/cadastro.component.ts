import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { DriversService, Driver } from '../../services/drivers.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  equipes: { team: string; logo: string; color: string }[] = [];
  equipeSelecionada: { team: string; logo: string; color: string } | null = null;
  selectAberto = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private driversService: DriversService
  ) {
    const drivers = this.driversService.getDrivers();
    this.equipes = drivers.reduce((acc: any[], d) => {
      if (!acc.find(e => e.team === d.team)) {
        acc.push({ team: d.team, logo: d.logo, color: d.teamColor });
      }
      return acc;
    }, []);

    this.cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(20)]],
        dataNascimento: ['', [Validators.required]], // 👈 AQUI
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmarSenha: ['', [Validators.required]]
      },
      {
        validators: this.senhasIguais
      });
  }

  // toggleSelect(event: Event): void {
  //   event.stopPropagation();
  //   this.selectAberto = !this.selectAberto;
  // }

  // selecionarEquipe(equipe: { team: string; logo: string; color: string }, event: Event): void {
  //   event.stopPropagation();
  //   this.equipeSelecionada = equipe;
  //   this.cadastroForm.patchValue({ equipesFavorita: equipe.team });
  //   this.selectAberto = false;
  // }

  // limparEquipe(event: Event): void {
  //   event.stopPropagation();
  //   this.equipeSelecionada = null;
  //   this.cadastroForm.patchValue({ equipesFavorita: '' });
  // }

  senhasIguais(form: AbstractControl) {
    const senha = form.get('senha')?.value;
    const confirmar = form.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhaDiferente: true };
  }

  onSubmit() {
    if (this.cadastroForm.valid) {

      //colocar cadsatro na api

      const form = this.cadastroForm.value;

      const payload = {
        name: form.nome,
        email: form.email,
        password: form.senha,
        password_confirmation: form.confirmarSenha,
        phone: form.phone,
        birth: form.dataNascimento
      };

      this.loginService.register(payload).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          const msg = err.error?.message || 'Erro ao realizar cadastro. Tente novamente.';
          alert(msg);
        }
      });

      // const resultado = this.loginService.cadastrar(this.cadastroForm.value);
      // alert(resultado.mensagem);
      // if (resultado.sucesso) {
      //   this.router.navigate(['/login']);
      //   this.cadastroForm.reset();
      // }
    } else {
      this.cadastroForm.markAllAsTouched();
      alert('Por favor, corrija os erros no formulário antes de enviar.');
    }
  }
}