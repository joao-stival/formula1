import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { DriversService } from '../../services/drivers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUserEmail: string | null = null;
  currentUserNome: string | null = null;
  currentUserPais: string | null = null;
  equipeFavoritaLogo: string | null = null;
  equipeFavoritaCor: string | null = null;
  menuAberto = false;

  getFlagUrl(sigla: string): string {
    return `https://flagsapi.com/${sigla}/flat/32.png`;
  }
  private destroy$ = new Subject<void>();

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private driversService: DriversService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.carregarEquipe();
    }

    this.loginService.user$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.carregarEquipe();
    });
  }

  private carregarEquipe(): void {
    const user = this.loginService.getCurrentUser();
    if (user) {
      this.currentUserEmail = user.email;
      this.currentUserNome = user.nome || null;
      this.currentUserPais = user.pais || null;
      if (user.equipesFavorita) {
        const drivers = this.driversService.getDrivers();
        const equipeDriver = drivers.find(d => d.team === user.equipesFavorita);
        if (equipeDriver && equipeDriver.logo) {
          this.equipeFavoritaLogo = equipeDriver.logo;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.currentUserEmail = null;
    this.currentUserNome = null;
    this.currentUserPais = null;
    this.router.navigate(['/login']);
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
    this.fecharMenu();
  }
}

