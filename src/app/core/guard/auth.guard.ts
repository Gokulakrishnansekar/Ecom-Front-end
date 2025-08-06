import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const jwtHelper = new JwtHelperService();

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  if (
    localStorage.getItem('token') &&
    !jwtHelper.isTokenExpired(localStorage.getItem('token'))
  ) {
    return router.navigate(['/home']);
  }

  return true;
};
