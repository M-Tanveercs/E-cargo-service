import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverCommonService } from '../auth/common.service';
import { AuthserviceService } from '../auth/authservice.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-DriverSideBar',
  templateUrl: './DriverSideBar.component.html',
  styleUrls: ['./DriverSideBar.component.css']
})
export class DriverSideBarComponent implements OnInit {

  bookedcount: any;
  canceljobcount: any;
  authstatus: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;

  constructor(public commonservice:DriverCommonService,private userAuthService:AuthserviceService ,private router:Router,private message:NzMessageService) { }

  ngOnInit( ) {
    this.userAuthService.driverAuthStatus$.subscribe(status => {
      this.authstatus = status;
   
    
    })
    // this.commonservice.jobAcceptcountData$.subscribe((data) => {
    //   this.bookedcount = data;
    
    // });
    // this.commonservice.jobProcessingcount$.subscribe(data => {
    //   this.jobproc = data
    //   })
    //   this.commonservice.jobonthewaycount$.subscribe(data => {
    //   this.jobontheway = data
    //   })
      // this.commonservice.jobDeliverCount$.subscribe(data => {
      // this.jobdelv = data
      // })
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
    localStorage.setItem('LoginDriver','')
  
    localStorage.removeItem('isDriverAuthenticated');
    this.message.create('info','Logout Successfully')
    this.router.navigate(['']);
  }

}
