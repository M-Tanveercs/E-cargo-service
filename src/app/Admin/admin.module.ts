import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';




import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { NzSpaceModule } from 'ng-zorro-antd/space';

import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { AdminDashbordComponent } from './components/AdminDashbord/admin-Dashbord/admin-Dashbord.component';
import { AdminMainDashComponent } from './components/AdminDashbord/admin-main-dash/admin-main-dash.component';
import { HeaderComponent } from './components/AdminDashbord/header/header.component';
import { SideBarComponent } from './components/AdminDashbord/sideBar/sideBar.component';
import { AdminDashFooterComponent } from './components/AdminDashbord/admin-dash-footer/admin-dash-footer.component';

@NgModule({
  declarations: [AdminLoginComponent,AdminDashbordComponent,AdminMainDashComponent,AdminDashFooterComponent,HeaderComponent,SideBarComponent],
  imports: [
  
    AdminRoutingModule,
    CommonModule,
    NzIconModule,

    NzLayoutModule,
    NzSwitchModule,FormsModule,
    NzCollapseModule,
    NzAvatarModule,
    NzDropDownModule,
    NzButtonModule,
    NzBadgeModule,
    NzStepsModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDrawerModule,
    NzSpaceModule,
    NzDatePickerModule,
    NzTimePickerModule
    
  ],
  exports:[AdminLoginComponent]
})
export class AdminModule { }
