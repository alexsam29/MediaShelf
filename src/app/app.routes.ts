import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout-component/main-layout-component';
import { authGuard } from './auth/auth-guard/auth-guard';

export const routes: Routes = [
  // Auth routes (no layout)
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login-component/login-component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'signUp',
    loadComponent: () =>
      import('./auth/register-component/register-component').then(
        (m) => m.RegisterComponent,
      ),
  },

  // Main app routes (with layout)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home-component').then((m) => m.HomeComponent),
      },
    ],
  },
];
