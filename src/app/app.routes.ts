import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';

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
];


