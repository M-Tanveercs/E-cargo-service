import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from 'src/app/users/components/user-dashboard/main-dashboard/main-dashboard.component';
import { agencyAuthGuardGuard } from '../../agencyAuthGard/agency-auth-guard.guard';
import { AgencyDashBordComponent } from './AgencyDashBord/AgencyDashBord.component';

const routes: Routes = [
  {path:'', component: MainDashboardComponent ,
  children:[
    { path: '', redirectTo: 'agency-dashbord', pathMatch: 'full' },
    {path:'agency-dashbord',component:AgencyDashBordComponent},
  
    
  ]}
]


  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyDashBordRoutingModule { }
