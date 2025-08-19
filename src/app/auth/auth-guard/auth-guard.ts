import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/auth';
import { map, filter, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for auth to be initialized, then check if authenticated
  return combineLatest([
    authService.authInitialized$,
    authService.isAuthenticated$,
  ]).pipe(
    filter(([initialized]) => initialized), // Wait until auth is initialized
    take(1),
    map(([isAuthenticated]) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
