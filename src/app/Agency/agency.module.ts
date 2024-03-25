import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyLoginComponent } from './compnents/agency-login/agency-login.component';
import { AgencySignupComponent } from './compnents/agency-signup/agency-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './compnents/home/home.component';


@NgModule({
  declarations: [AgencyLoginComponent,AgencySignupComponent,HomeComponent],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    ReactiveFormsModule
  ],
  exports:[AgencyLoginComponent,AgencySignupComponent,HomeComponent]
})
export class AgencyModule { }
