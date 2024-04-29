import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyAuthService } from 'src/app/Agency/agencyAuthGard/agency-auth.service';
import { AgencyDashService } from 'src/app/Agency/compnents/agency-dash-bord/agency-dash.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';
@Component({
  selector: 'app-sideBar',
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.css']
})
export class SideBarComponent implements OnInit {
  bookedcount: any;
  canceljobcount: any;
  authstatus: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;

  constructor(public commonservice:AdminCommonService,private userAuthService:AgencyAuthService ,private router:Router,private message:NzMessageService) { }

  ngOnInit( ) {
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;
   
    
    })
    this.commonservice.jobAcceptcountData$.subscribe((data) => {
      this.bookedcount = data;
    
    });
    this.commonservice.jobProcessingcount$.subscribe(data => {
      this.jobproc = data
      })
      this.commonservice.jobonthewaycount$.subscribe(data => {
      this.jobontheway = data
      })
      this.commonservice.jobDeliverCount$.subscribe(data => {
      this.jobdelv = data
      })
  //  this.commonservice.canceljobcountData$.subscribe((data)=>{
  //   this.canceljobcount=data
  //  })
  
  
  }

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  theme = false;
  logout(){
    localStorage.setItem('LoginAgency','')
    this.userAuthService.updateAuthStatus(false);
    // Set authentication status to false
    // Remove authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    this.message.create('info','Logout Successfully')
    this.router.navigate(['/agency']);
  }

}
