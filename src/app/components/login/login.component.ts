import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  user: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  login() {
  this.user = this.loginService.login(this.email, this.senha);
  if (this.user) {
    // Em vez de usar o router, use o window.location
    window.location.href = '/home'; 
  } else {
    alert('Login falhou: email ou senha incorretos');
  }
}

}
