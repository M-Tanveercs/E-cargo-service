import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyLoginComponent } from './compnents/agency-login/agency-login.component';
import { AgencySignupComponent } from './compnents/agency-signup/agency-signup.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NzStepsModule } from 'ng-zorro-antd/steps';


import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';



import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { HeaderComponent } from './compnents/header/header.component';
import { FooterComponent } from './compnents/footer/footer.component';

import { JobsComponent } from './compnents/jobs/jobs.component';
import { MainComponent } from './compnents/main/main.component';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MoreInfoAboutJobComponent } from './compnents/moreInfoAboutJob/moreInfoAboutJob.component';
import { AgencyAuthService } from './agencyAuthGard/agency-auth.service';
import { AgencyCommonService } from './agency-common.service';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


@NgModule({
  declarations: [AgencyLoginComponent,AgencySignupComponent,HeaderComponent,FooterComponent, JobsComponent,MainComponent,MoreInfoAboutJobComponent],
  exports:[AgencyLoginComponent,AgencySignupComponent,HeaderComponent,FooterComponent,MainComponent,JobsComponent,MoreInfoAboutJobComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgencyRoutingModule,
    ReactiveFormsModule,
    
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
    NzSwitchModule,
    NzToolTipModule,
    NzAutocompleteModule,
  ],
providers: [AgencyCommonService],
})
export class AgencyModule { }
