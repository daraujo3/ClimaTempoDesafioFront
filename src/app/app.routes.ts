import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Registrar } from './features/registrar/registrar';
import { Favoritos } from './features/favoritos/favoritos';

export const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastro',
    component: Registrar
  },
  {
    path: 'favoritos',
    component: Favoritos
  }
];
