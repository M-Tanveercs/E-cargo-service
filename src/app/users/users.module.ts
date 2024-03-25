import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';


import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';


import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { VehiclesAndGoodsInfoComponent } from './components/vehicles-and-goods-info/vehicles-and-goods-info.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { BookingComponent } from './components/booking/booking.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { ContactUsComponent } from './components/contactUs/contactUs.component';
import { PricingTableComponent } from './components/Pricing-table/Pricing-table.component';
import { SuccessComponent } from './components/success/success.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { UserAuthService } from './userAuth.service';
import { UserCommonService } from './user-common.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonService } from '../common.service';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzCheckboxModule,
    AppRoutingModule,
    NzRadioModule,
    FormsModule,
    NzIconModule,
    NzCarouselModule,
    NzDividerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzCollapseModule,
    NzFormModule ,
    NzAvatarModule,
    NzMessageModule,
    NzSwitchModule

  ],
  declarations: [UserLoginComponent,
    UserSignupComponent, VehiclesAndGoodsInfoComponent, PricingComponent, BookingComponent, HomeComponent, AboutUsComponent, ContactUsComponent, PricingTableComponent,SuccessComponent,HeaderComponent,FooterComponent,],
  exports: [UserLoginComponent,
    UserSignupComponent, VehiclesAndGoodsInfoComponent, PricingComponent, BookingComponent, HomeComponent, AboutUsComponent, ContactUsComponent, PricingTableComponent,SuccessComponent,HeaderComponent,FooterComponent,],
providers: [
  UserAuthService,UserCommonService,CommonService
]
})
export class UsersModule { }
