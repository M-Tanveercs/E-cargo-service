import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverLoginComponent } from './driverLogin/driverLogin.component';
import { DriverMainDashComponent } from './driverMainDash/driverMainDash.component';
import { DriverDashComponent } from './driverDash/driverDash.component';
import { authguardGuard } from './auth/authguard.guard';
import { CargoStatusComponent } from './cargoStatus/cargoStatus.component';

const routes: Routes = [

  {path:'', component: DriverMainDashComponent ,
  canActivate:[ authguardGuard],
  children:[
    { path: '', redirectTo: 'driver-dashboard', pathMatch: 'full' },
    {path:'driver-dashboard',component:DriverDashComponent},
    {path:'cargo-status/:id',component:CargoStatusComponent}
 ] },
 {path:'driver-login',component:DriverLoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
