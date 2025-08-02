import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { authGuard } from './auth/auth-guard/auth-guard';
import { LoginComponent } from './auth/login-component/login-component';

export const routes: Routes = [
  // Define your application routes here
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
];
