import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgencyLoginComponent } from './compnents/agency-login/agency-login.component';
import { AgencySignupComponent } from './compnents/agency-signup/agency-signup.component';


import { JobsComponent } from './compnents/jobs/jobs.component';
import { agencyAuthGuardGuard } from './agencyAuthGard/agency-auth-guard.guard';
import { HomeComponent } from '../users/components/home/home.component';
import { AboutUsComponent } from '../users/components/aboutUs/aboutUs.component';
import { ContactUsComponent } from '../users/components/contactUs/contactUs.component';
import { PricingTableComponent } from '../users/components/Pricing-table/Pricing-table.component';
import { MoreInfoAboutJobComponent } from './compnents/moreInfoAboutJob/moreInfoAboutJob.component';
import { MainsComponent } from './compnents/mains/mains.component';


const routes: Routes = [
  {path:'',component:MainsComponent,

children:[
 { path: '', 
  redirectTo: 'agency', // Redirect to the home component
  pathMatch: 'full' 
},
{ 
  path: 'agency', 
  component: HomeComponent,
    canActivate: [agencyAuthGuardGuard], 
},
  {path:'agency-login',component:AgencyLoginComponent},
  {path:'agency-signup',component:AgencySignupComponent},
  { path: 'jobs', component: JobsComponent },
    
  { path: 'agency-aboutUs', component: AboutUsComponent },
  { path: 'agency-contactUS', component: ContactUsComponent },
  { path: 'agency-pricing-table', component: PricingTableComponent },
  { path: 'more-info', component: MoreInfoAboutJobComponent },
]
},
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
