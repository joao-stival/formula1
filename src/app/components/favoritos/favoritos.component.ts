import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { LoginService } from '../../services/login.service';
import { Driver } from '../../services/drivers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit, OnDestroy {
  favoriteDrivers: Driver[] = [];
  isLoggedIn = false;
  private destroy$ = new Subject<void>();

  constructor(
    private favoritesService: FavoritesService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.favoritesService.favoriteDrivers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favoriteDrivers = favorites;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkLoginStatus() {
    const user = this.loginService.getCurrentUser();
    this.isLoggedIn = !!user;
  }

  removeFavorite(driverNumber: number) {
    this.favoritesService.removeFavorite(driverNumber);
  }
}

