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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { NzSpaceModule } from 'ng-zorro-antd/space';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { ManageReviewsComponent } from './manageReviews/manageReviews.component';
import { AcceptedJobsComponent } from './Accepted-jobs/Accepted-jobs.component';
import { InProcessJobsComponent } from './InProcessJobs/InProcessJobs.component';
import { CompletedJobsComponent } from './CompletedJobs/CompletedJobs.component';
import { JobTrackingComponent } from './JobTracking/JobTracking.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AgencyDashService } from './agency-dash.service';
import { OnTheWayComponent } from './on-the-way/on-the-way.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { AgencyProfileEditComponent } from './agencyProfileEdit/agencyProfileEdit.component';
import { CoreService } from 'src/app/core/core.service';
import { AgencyAuthService } from '../../agencyAuthGard/agency-auth.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ManageDriverComponent } from './manage-driver/manage-driver.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [
AgencyMainDashBordComponent,AgencyDashBordComponent,AgencyFooterComponent,AgencyHeaderComponent,AgencySideBarComponent,ManageReviewsComponent ,AcceptedJobsComponent,OnTheWayComponent,InProcessJobsComponent,CompletedJobsComponent,JobTrackingComponent,AgencyProfileEditComponent,ManageDriverComponent
  ],
  exports:[AgencyMainDashBordComponent,AgencyDashBordComponent,AgencyFooterComponent,AgencyHeaderComponent,AgencySideBarComponent,ManageReviewsComponent ,AcceptedJobsComponent,OnTheWayComponent,InProcessJobsComponent,JobTrackingComponent,CompletedJobsComponent,AgencyProfileEditComponent,ManageDriverComponent],
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
    NzSelectModule,
    NzDrawerModule,
    NzSpaceModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSpinModule,
    NzTableModule,
    NzPopconfirmModule
  ],providers:[
    AgencyDashService,CoreService,AgencyAuthService
  ]
})
export class AgencyDashBordModule { }
