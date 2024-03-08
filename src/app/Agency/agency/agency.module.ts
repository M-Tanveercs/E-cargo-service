import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyComponent } from './agency.component';
import { AgencyLoginComponent } from '../agency-login/agency-login.component';
import { AgencySignupComponent } from '../agency-signup/agency-signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [AgencyComponent,AgencyLoginComponent,AgencySignupComponent]
})
export class AgencyModule { }
