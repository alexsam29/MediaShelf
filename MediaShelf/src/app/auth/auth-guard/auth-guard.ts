import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/auth';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      console.log(isAuthenticated)
      if (isAuthenticated) {
        return true; // Allow navigation
      } else {
        router.navigate(['/login']); // Redirect to login page
        return false; // Prevent navigation
      }
    })
  );
};
