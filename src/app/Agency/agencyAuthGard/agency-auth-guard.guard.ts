

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AgencyAuthService } from './agency-auth.service';

@Injectable({
  providedIn: 'root'
})
export class agencyAuthGuardGuard implements CanActivate {
  constructor(private authService: AgencyAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      
      return true;
    }
   
    // Redirect to the login page with the attempted URL as a query parameter
    return this.router.navigate(['/agency-login'])
  }
}
