import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../userAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    localStorage.setItem('returnUrl', '');
    // Store the attempted URL in local storage
    localStorage.setItem('returnUrl', state.url);

    // Redirect to the login page with the attempted URL as a query parameter
    return this.router.createUrlTree(['/user-login'], { queryParams: { returnUrl: state.url } });
  }
}
