import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { EventoComponent } from './components/evento/evento.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroTimesComponent } from './components/cadastro-times/cadastro-times.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home - F1 Hub'
  },
  {
    path: 'content',
    component: ContentComponent,
    title: 'Pilotos - F1 Hub'
  },
  {
    path: 'evento',
    component: EventoComponent,
    title: 'Evento - F1 Hub',
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - F1 Hub'
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    title: 'Cadastro - F1 Hub'
  },
  {
    path: 'cadastro-times',
    component: CadastroTimesComponent,
    title: 'Cadastro de Times - F1 Hub',
    canActivate: [authGuard]
  },
  {
    path: 'favoritos',
    component: FavoritosComponent,
    title: 'Favoritos - F1 Hub',
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    title: 'Perfil - F1 Hub',
    canActivate: [authGuard]
  }
];


