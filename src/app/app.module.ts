import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home-main/header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
registerLocaleData(en);
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzInputModule } from 'ng-zorro-antd/input';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';


import { AboutUsComponent } from './home-main/aboutUs/aboutUs.component';
import { ContactUsComponent } from './home-main/contactUs/contactUs.component';
import { HomeComponent } from './home-main/home/home.component';

import { UserModule } from './user/user/user.module';
import { AgencyModule } from './Agency/agency/agency.module';
import { AdminModule } from './Admin/admin/admin.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FooterComponent } from './home-main/footer/footer.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [							
    AppComponent,
      HeaderComponent,
     HomeComponent,
      
      AboutUsComponent,
      ContactUsComponent,
      FooterComponent
 
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzInputModule,
    NzCarouselModule,
    ReactiveFormsModule,
    UserModule,
    AgencyModule,
    AdminModule,
    NzCollapseModule,
    NzSelectModule,
    NzDividerModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
