import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverLoginComponent } from './driverLogin/driverLogin.component';

const routes: Routes = [

  {path:'driver-login', component:DriverLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
