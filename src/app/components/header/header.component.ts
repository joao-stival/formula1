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
  isAdmin = false;
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
    this.loginService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isLoggedIn = !!user;
      this.isAdmin = !!user?.admin;
      if (user) {
        this.carregarEquipe();
      } else {
        this.currentUserEmail = null;
        this.currentUserNome = null;
        this.currentUserPais = null;
        this.equipeFavoritaLogo = null;
        this.equipeFavoritaCor = null;
      }
    });
  }

  private carregarEquipe(): void {
    const user = this.loginService.getCurrentUser();
    if (user) {
      this.currentUserEmail = user.email;
      // suporta tanto name (API) quanto nome (legado)
      this.currentUserNome = user.name || user.nome || null;
      // suporta adresses[0].country (API) ou pais (legado)
      this.currentUserPais = user.adresses?.[0]?.country || user.pais || null;

      const equipe = user.favorites || null;
      if (equipe) {
        const drivers = this.driversService.getDrivers();
        const equipeDriver = drivers.find(d => d.team === equipe);
        if (equipeDriver && equipeDriver.logo) {
          this.equipeFavoritaLogo = equipeDriver.logo;
        } else {
          this.equipeFavoritaLogo = null;
        }
      } else {
        this.equipeFavoritaLogo = null;
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

