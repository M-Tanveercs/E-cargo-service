import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyLoginComponent } from './compnents/agency-login/agency-login.component';
import { AgencySignupComponent } from './compnents/agency-signup/agency-signup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgencyLoginComponent,AgencySignupComponent],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    ReactiveFormsModule
  ],
  exports:[AgencyLoginComponent,AgencySignupComponent]
})
export class AgencyModule { }
