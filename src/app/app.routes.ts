import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { EventoComponent } from './evento/evento.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

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
    title: 'Evento - F1 Hub'
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
  }
];


