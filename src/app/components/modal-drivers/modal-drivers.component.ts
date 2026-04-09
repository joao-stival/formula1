import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { DriversService, Driver } from '../../services/drivers.service';
import { FavoritesService } from '../../services/favorites.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-drivers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-drivers.component.html',
  styleUrl: './modal-drivers.component.scss'
})
export class ModalDriversComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedDriver: Driver | null = null;
  @Input() modalAberto = false;
  @Output() fechar = new EventEmitter<void>();
  
  searchQuery = '';
  drivers: Driver[] = [];
  isFavorited = false;
  isLoggedIn = false;
  private destroy$ = new Subject<void>();

  constructor(
    private driversService: DriversService,
    private favoritesService: FavoritesService,
    private loginService: LoginService
  ) {
    this.drivers = this.driversService.getDrivers();
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.favoritesService.favoriteDrivers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateFavoriteStatus();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDriver'] && !changes['selectedDriver'].firstChange) {
      this.updateFavoriteStatus();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredDrivers(): Driver[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.drivers;
    return this.drivers.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.team.toLowerCase().includes(q) ||
      d.number.toString().includes(q)
    );
  }

  fecharModal() {
    this.fechar.emit();
  }

  toggleFavorite() {
    if (!this.isLoggedIn) {
      alert('Por favor, faça login para adicionar favoritos!');
      return;
    }

    if (this.selectedDriver) {
      this.favoritesService.toggleFavorite(this.selectedDriver);
      this.updateFavoriteStatus();
    }
  }

  private updateFavoriteStatus() {
    if (this.selectedDriver) {
      this.isFavorited = this.favoritesService.isFavorite(this.selectedDriver);
    }
  }

  private checkLoginStatus() {
    const user = this.loginService.getCurrentUser();
    this.isLoggedIn = !!user;
    this.updateFavoriteStatus();
  }
}
