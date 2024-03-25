import { CanActivateFn } from '@angular/router';

export const agencyAuthGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
