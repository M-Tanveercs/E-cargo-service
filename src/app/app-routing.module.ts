import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgencyLoginComponent } from './Agency/compnents/agency-login/agency-login.component';
import { AgencySignupComponent } from './Agency/compnents/agency-signup/agency-signup.component';
import { AdminLoginComponent } from './Admin/components/admin-login/admin-login.component';








const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./Agency/agency-routing.module').then(m => m.AgencyRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./Admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
