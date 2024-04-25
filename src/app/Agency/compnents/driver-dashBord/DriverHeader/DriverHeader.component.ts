import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyDashService } from '../../agency-dash-bord/agency-dash.service';
import { AuthserviceService } from '../auth/authservice.service';
import { DriverCommonService } from '../auth/common.service';
@Component({
  selector: 'app-DriverHeader',
  templateUrl: './DriverHeader.component.html',
  styleUrls: ['./DriverHeader.component.css']
})
export class DriverHeaderComponent implements OnInit {

  

  username: any;
  userLoginData: any;
  bookedcount: any;
  authstatus: any;

  constructor(private userAuthService:AuthserviceService, private router:Router ,public commonservice:DriverCommonService) { }

  ngOnInit() {
    debugger
    this.userAuthService.driverAuthStatus$.subscribe(status => {
      this.authstatus = status;

    
    })
    const loginUser=localStorage.getItem('LoginDriver')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullName: any; 
}) => {
      this.username=element.fullName
     
    });
    console.log(this.username);


  }
  // const job=localStorage.getItem('bookedJob')
  // if(job){
  //   this.bookedcount=JSON.parse(job)
  // }
  // this.commonservice.jobAcceptcountData$.subscribe((data) => {
  //   this.bookedcount = data;

  // });
}
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

