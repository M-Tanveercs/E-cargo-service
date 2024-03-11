import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { BookedJobComponent } from './booked-job/booked-job.component';
import { CompletedJobComponent } from './completed-job/completed-job.component';
import { InoviceComponent } from './inovice/inovice.component';
import { TrackJobComponent } from './track-job/track-job.component';
import { EditProfileComponent } from './Edit-profile/Edit-profile.component';
import { SettingComponent } from './setting/setting.component';



const routes: Routes = [
  {path:'', component: MainDashboardComponent , 
  children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'dashboard',component:DashboardComponent},
    {path:'manage-reviews',component:ManageReviewsComponent},
    {path:'booked-job',component:BookedJobComponent},
    {path:'completed-job',component:CompletedJobComponent},
    {path:'payment-history',component:InoviceComponent},
    {path:'track-job',component:TrackJobComponent},
    {path:'edit-profile',component:EditProfileComponent},
    {path:'setting',component:SettingComponent},
  ]

},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
