import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverCommonService } from '../auth/common.service';
import { AuthserviceService } from '../auth/authservice.service';

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

  constructor(public commonservice:DriverCommonService,private userAuthService:AuthserviceService ,private router:Router) { }

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
    this.userAuthService.updateDriverAuthStatus(false);
    // Set authentication status to false
    // Remove authentication status from localStorage
    localStorage.removeItem('isDriverAuthenticated');
    alert('user logged out')
    this.router.navigate(['']);
  }

}
