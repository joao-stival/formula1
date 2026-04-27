import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DriversService, Driver } from './drivers.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  clearFavorites() {
    throw new Error('Method not implemented.');
  }
  private favoriteDrivers = new BehaviorSubject<Driver[]>([]);
  public favoriteDrivers$ = this.favoriteDrivers.asObservable();
  private currentUserEmail: string | null = null;

  constructor(private driversService: DriversService) {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.currentUserEmail = userData.email;
      const favorites = localStorage.getItem(`favorites_${userData.email}`);
      if (favorites) {
        const favoriteNumbers = JSON.parse(favorites);
        const drivers = this.driversService.getDrivers();
        const favs = drivers.filter(d => favoriteNumbers.includes(d.number));
        this.favoriteDrivers.next(favs);
      }
    }
  }

  setCurrentUser(email: string) {
    this.currentUserEmail = email;
    this.loadFavoritesFromStorage();
  }

  isFavorite(driver: Driver): boolean {
    const favorites = this.favoriteDrivers.value;
    return favorites.some(fav => fav.number === driver.number);
  }

  addFavorite(driver: Driver) {
    if (!this.currentUserEmail) {
      return false;
    }

    let favorites = [...this.favoriteDrivers.value];
    if (!favorites.find(d => d.number === driver.number)) {
      favorites.push(driver);
      this.favoriteDrivers.next(favorites);
      this.saveFavoritesToStorage(favorites);
      return true;
    }
    return false;
  }

  removeFavorite(driverNumber: number) {
    if (!this.currentUserEmail) {
      return false;
    }

    let favorites = this.favoriteDrivers.value.filter(d => d.number !== driverNumber);
    this.favoriteDrivers.next(favorites);
    this.saveFavoritesToStorage(favorites);
    return true;
  }

  toggleFavorite(driver: Driver): boolean {
    if (!this.currentUserEmail) {
      return false;
    }

    if (this.isFavorite(driver)) {
      this.removeFavorite(driver.number);
      return false;
    } else {
      this.addFavorite(driver);
      return true;
    }
  }

  getFavorites(): Driver[] {
    return this.favoriteDrivers.value;
  }

  private saveFavoritesToStorage(favorites: Driver[]) {
    if (this.currentUserEmail) {
      const favoriteNumbers = favorites.map(d => d.number);
      localStorage.setItem(`favorites_${this.currentUserEmail}`, JSON.stringify(favoriteNumbers));
    }
  }

  logout() {
    this.currentUserEmail = null;
    this.favoriteDrivers.next([]);
  }
}
