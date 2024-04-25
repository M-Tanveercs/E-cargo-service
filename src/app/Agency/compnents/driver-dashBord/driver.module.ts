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


import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DriverCommonService } from './auth/common.service';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverLoginComponent } from './driverLogin/driverLogin.component';
import { DriverMainDashComponent } from './driverMainDash/driverMainDash.component';
import { DriverDashComponent } from './driverDash/driverDash.component';
import { DriverHeaderComponent } from './DriverHeader/DriverHeader.component';
import { DriverSideBarComponent } from './DriverSideBar/DriverSideBar.component';
import { DriverFooterComponent } from './driver-footer/driver-footer.component';
import { CargoStatusComponent } from './cargoStatus/cargoStatus.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { CoreService } from 'src/app/core/core.service';
@NgModule({
  declarations: [DriverLoginComponent,DriverMainDashComponent,DriverDashComponent,DriverHeaderComponent,DriverSideBarComponent,DriverFooterComponent,CargoStatusComponent],
  exports:[DriverLoginComponent,DriverMainDashComponent,DriverDashComponent,DriverHeaderComponent,DriverSideBarComponent,DriverFooterComponent,CargoStatusComponent],
  imports: [
    NzDatePickerModule,
    NzTimePickerModule,
    NzBadgeModule,
    CommonModule,
    DriverRoutingModule,
    CommonModule,
    FormsModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzSpaceModule,
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
    NzPopconfirmModule,
  ],providers:[DriverCommonService,CoreService]
})
export class DriverModule { }
