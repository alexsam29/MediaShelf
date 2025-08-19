import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../../core/auth';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared-imports';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [...SHARED_IMPORTS],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  isAuthenticated = false;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth),
    );
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onMenuToggle() {
    this.menuToggle.emit();
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => console.error('Logout failed:', error),
    });
  }
}
