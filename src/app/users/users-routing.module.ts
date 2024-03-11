import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { VehiclesAndGoodsInfoComponent } from './components/vehicles-and-goods-info/vehicles-and-goods-info.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { ContactUsComponent } from './components/contactUs/contactUs.component';
import { PricingTableComponent } from './components/Pricing-table/Pricing-table.component';
import { BookingComponent } from './components/booking/booking.component';
import { SuccessComponent } from './components/success/success.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'contactUS', component: ContactUsComponent },
      { path: 'pricing-table', component: PricingTableComponent },
      { path: 'user-login', component: UserLoginComponent },
      { path: 'user-signup', component: UserSignupComponent },
      { path: 'vehicles-and-goods-info', component: VehiclesAndGoodsInfoComponent },
      { path: 'pricing', component: PricingComponent },
      {path:'booking',component:BookingComponent},
      {path:'booking/success',component:SuccessComponent},
     

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
