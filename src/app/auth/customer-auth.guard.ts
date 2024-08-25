import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

export const CustomerAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();
  if (user && user.role === 'CUSTOMER') {
    return true;
  } else {
    router.navigate(['/not-authorized']);
    return false;
  }
};
