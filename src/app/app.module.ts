import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { HttpClientModule } from '@angular/common/http';

import { NzButtonModule } from 'ng-zorro-antd/button';
registerLocaleData(en);

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


import { AdminModule } from './Admin/admin.module';
import { UsersModule } from './users/users.module';
import { AgencyModule } from './Agency/agency.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UsersRoutingModule } from './users/users-routing.module';
import { HeaderComponent } from './users/components/header/header.component';
import { FooterComponent } from './users/components/footer/footer.component';
import { AgencyRoutingModule } from './Agency/agency-routing.module';
import { AdminRoutingModule } from './Admin/admin-routing.module';


@NgModule({
  declarations: [							
    AppComponent,
      HeaderComponent,
    
      FooterComponent
 
   ],
  imports: [
    BrowserModule,
  UsersModule,
AgencyModule,
NzIconModule,
  AdminModule,
    AppRoutingModule,
    NzButtonModule,
    HttpClientModule,
    NzDropDownModule,
UsersRoutingModule,
AgencyRoutingModule,
AdminRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
