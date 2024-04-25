


import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';



@Injectable({
  providedIn: 'root'
})
export class authguardGuard implements CanActivate {
  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger
    if (this.authService.isDriverAuthenticated()) {
      
      return true;
    }
   
    // Redirect to the login page with the attempted URL as a query parameter
    return this.router.navigate(['/driver-login'])
  }
}
