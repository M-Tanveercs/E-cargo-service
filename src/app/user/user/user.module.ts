import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { VehiclesAndGoodsInfoComponent } from './vehicles-and-goods-info/vehicles-and-goods-info.component';
import { PricingComponent } from './pricing/pricing.component';
import { BookingComponent } from './booking/booking.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    AppRoutingModule,
    NzDividerModule,
    NzRadioModule,
    FormsModule
  ],
  declarations: [UserComponent,UserLoginComponent,
  UserSignupComponent,VehiclesAndGoodsInfoComponent,PricingComponent,BookingComponent,]
})
export class UserModule { }
