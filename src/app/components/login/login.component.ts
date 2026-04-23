import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  } 

 onSubmit() {

  Object.keys(this.loginForm.controls).forEach(key => {
    const controlErrors = this.loginForm.get(key)?.errors;
    if (controlErrors != null) {
      console.log('Erro no campo: ' + key, controlErrors);
    }
  });

    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.login(payload).subscribe({
        next: (res) => {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/dashboard']); // ou sua rota principal
        },
        error: (err) => {
          alert('E-mail ou senha incorretos.');
          console.error(err);
        }
      });
    } else {
      console.log('Formulário inválido:', this.loginForm.errors);
      this.loginForm.markAllAsTouched();
    }
  }
}