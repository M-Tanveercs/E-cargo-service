import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyDashBordRoutingModule } from './agency-dash-bord-routing.module';
import { AgencyMainDashBordComponent } from './agencyMainDashBord/agencyMainDashBord.component';
import { AgencyDashBordComponent } from './AgencyDashBord/AgencyDashBord.component';
import { AgencyFooterComponent } from './agencyFooter/agencyFooter.component';
import { AgencyHeaderComponent } from './AgencyHeader/AgencyHeader.component';
import { AgencySideBarComponent } from './agencySideBar/agencySideBar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
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


import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
AgencyMainDashBordComponent,AgencyDashBordComponent,AgencyFooterComponent,AgencyHeaderComponent,AgencySideBarComponent
  ],
  exports:[AgencyMainDashBordComponent,AgencyDashBordComponent,AgencyFooterComponent,AgencyHeaderComponent,AgencySideBarComponent],
  imports: [
    CommonModule,
    AgencyDashBordRoutingModule,
    CommonModule,
    NzIconModule,
    NzMenuModule,
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
    NzSelectModule
    
  ]
})
export class AgencyDashBordModule { }
