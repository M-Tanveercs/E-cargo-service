import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { AgencyLoginComponent } from './compnents/agency-login/agency-login.component';
import { AgencySignupComponent } from './compnents/agency-signup/agency-signup.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'agency-login',component:AgencyLoginComponent},
  {path:'agency-signup',component:AgencySignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
