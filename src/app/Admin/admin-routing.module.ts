import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLoginComponent } from './components/admin-login/admin-login.component';

import { AdminMainDashComponent } from './components/AdminDashbord/admin-main-dash/admin-main-dash.component';
import { AdminDashbordComponent } from './components/AdminDashbord/admin-Dashbord/admin-Dashbord.component';
import { adminAuthGuardGuard } from './adminAuthGard/admin-auth-guard.guard';
import { UserJobTrackingComponent } from './components/AdminDashbord/userJobTracking/userJobTracking.component';
import { AcceptedJobsAgencyComponent } from './components/AdminDashbord/Accepted-Jobs-Agency/Accepted-Jobs-Agency.component';
import { JobsOntheWayComponent } from './components/AdminDashbord/jobs-ontheWay/jobs-ontheWay.component';
import { JobsInProgressComponent } from './components/AdminDashbord/Jobs-in-progress/Jobs-in-progress.component';
import { DeliveredJobsComponent } from './components/AdminDashbord/delivered-jobs/delivered-jobs.component';

const routes: Routes = [
  {path:'', component: AdminMainDashComponent ,
  canActivate:[adminAuthGuardGuard],
  children:[
    { path: '', redirectTo: 'admin-dashbord', pathMatch: 'full' },
    {path:'admin-dashbord',component:AdminDashbordComponent},

    {path:'accepted-jobs',component:AcceptedJobsAgencyComponent},
    {path:'Job-onTheWay',component:JobsOntheWayComponent},
    {path:'inProcessJobs',component:JobsInProgressComponent},
    {path:'deliveed-jobs',component:DeliveredJobsComponent},
    {path:'user-job-tracking/:id',component:UserJobTrackingComponent}
  
    
  ]},
  {path:'admin-login',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
