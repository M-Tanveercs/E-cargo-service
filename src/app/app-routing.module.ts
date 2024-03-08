import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user/user/user-login/user-login.component';
import { HomeComponent } from './home-main/home/home.component';
import { UserSignupComponent } from './user/user/user-signup/user-signup.component';

import { AboutUsComponent } from './home-main/aboutUs/aboutUs.component';
import { ContactUsComponent } from './home-main/contactUs/contactUs.component';
import { AgencyLoginComponent } from './Agency/agency-login/agency-login.component';
import { AgencySignupComponent } from './Agency/agency-signup/agency-signup.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { VehiclesAndGoodsInfoComponent } from './user/user/vehicles-and-goods-info/vehicles-and-goods-info.component';
import { PricingTableComponent } from './home-main/Pricing-table/Pricing-table.component';
import { PricingComponent } from './user/user/pricing/pricing.component';
import { BookingComponent } from './user/user/booking/booking.component';


const routes: Routes = [
  {
    path: '',
   component:HomeComponent
  },
{
  path:'user/user-login',
  component: UserLoginComponent,
},
{
  path:'user/user-signup',
  component: UserSignupComponent,
},
{
  path:'user/vehicles-and-goods-info',
  component:VehiclesAndGoodsInfoComponent
},
{path:'user/pricing',
component:PricingComponent},
{
  path:'user/booking',
  component:BookingComponent
},
{path:'pricing-tabel',
component:PricingTableComponent},
{
  path:'aboutUs',
  component:AboutUsComponent
},
{
  path:'contactUs',
    component:ContactUsComponent
  
},
{
  path:'agency-login',
  component:AgencyLoginComponent
},
{
  path:'agency-signup',
  component:AgencySignupComponent
},{
  path:'admin-login',
  component:AdminLoginComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
