import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  currentUserEmail: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      const user = this.loginService.getCurrentUser();
      if (user) {
        this.currentUserEmail = user.email;
      }
    }
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.currentUserEmail = null;
    this.router.navigate(['/login']);
  }
}

