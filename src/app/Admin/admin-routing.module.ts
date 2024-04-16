import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLoginComponent } from './components/admin-login/admin-login.component';

import { AdminMainDashComponent } from './components/AdminDashbord/admin-main-dash/admin-main-dash.component';
import { AdminDashbordComponent } from './components/AdminDashbord/admin-Dashbord/admin-Dashbord.component';
import { adminAuthGuardGuard } from './adminAuthGard/admin-auth-guard.guard';

const routes: Routes = [
  {path:'', component: AdminMainDashComponent ,
  canActivate:[adminAuthGuardGuard],
  children:[
    { path: '', redirectTo: 'admin-dashbord', pathMatch: 'full' },
    {path:'admin-dashbord',component:AdminDashbordComponent},

    // {path:'AcceptedJobs',component:AcceptedJobsComponent},
    // {path:'onTheWay',component:OnTheWayComponent},
    // {path:'InProcessJobs',component:InProcessJobsComponent},
    // {path:'CompletedJobs',component:CompletedJobsComponent},
    // {path:'jobTracking/:id',component:JobTrackingComponent}
  
    
  ]},
  {path:'admin-login',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
