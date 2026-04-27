import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventoComponent } from './components/evento/evento.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroTimesComponent } from './components/cadastro-times/cadastro-times.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { authGuard } from './guards/auth.guard';
import { DriversComponent } from './components/drivers/drivers.component';
import { CadastroPilotosComponent } from './components/cadastro-pilotos/cadastro-pilotos.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './guards/admin.guard';
import { CadastroCorridasComponent } from './components/cadastro-corridas/cadastro-corridas.component';

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
    path: 'drivers',
    component: DriversComponent,
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
  },
  {
    path: 'cadastro-pilotos',
    component: CadastroPilotosComponent,
    title: 'Cadastro de Pilotos - F1 Hub',
    canActivate: [authGuard]
  },
  {
    path: 'gerenciar',
    component: GerenciarComponent,
    title: 'Gerenciar - F1 Hub',
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Painel Admin - F1 Hub',
    canActivate: [adminGuard]
  },
  {
    path: 'cadastro-corridas',
    component: CadastroCorridasComponent,
    title: 'Cadastro de Corridas - F1 Hub',
    canActivate: [authGuard]
  }
];


