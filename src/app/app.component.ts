import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterModule],
})
export class AppComponent implements OnInit {
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    // O FavoritesService carregará automaticamente os favoritos salvos
  }
}

