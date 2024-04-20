import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DriverLoginComponent } from './driverLogin/driverLogin.component';

import { DriverDashComponent } from './driverDash/driverDash.component';
import { DriverHeaderComponent } from './DriverHeader/DriverHeader.component';
import { DriverSideBarComponent } from './DriverSideBar/DriverSideBar.component';
import { DriverMainDashComponent } from './driverMainDash/driverMainDash.component';


@NgModule({
  declarations: [DriverLoginComponent,DriverMainDashComponent,DriverDashComponent,DriverHeaderComponent,DriverSideBarComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
    ReactiveFormsModule
  ]
})
export class DriverModule { }
