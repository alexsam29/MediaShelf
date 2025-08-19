import { Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { AuthService } from '../../core/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [...SHARED_IMPORTS],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error: any) => console.error('Logout failed', error),
    });
  }
}
