import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyAuthService } from 'src/app/Agency/agencyAuthGard/agency-auth.service';
import { AgencyDashService } from '../agency-dash.service';

@Component({
  selector: 'app-AgencyHeader',
  templateUrl: './AgencyHeader.component.html',
  styleUrls: ['./AgencyHeader.component.css']
})
export class AgencyHeaderComponent implements OnInit {


  username: any;
  userLoginData: any;
  bookedcount: any;
  authstatus: any;

  constructor(private userAuthService:AgencyAuthService, private router:Router ,public commonservice:AgencyDashService) { }

  ngOnInit() {
    debugger
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;

    
    })
    const loginUser=localStorage.getItem('LoginAgency')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
}) => {
      this.username=element.fullname
     
    });
    console.log(this.username);


  }
  // const job=localStorage.getItem('bookedJob')
  // if(job){
  //   this.bookedcount=JSON.parse(job)
  // }
  this.commonservice.jobAcceptcountData$.subscribe((data) => {
    this.bookedcount = data;

  });
}
  logout(){
    localStorage.setItem('LoginAgency','')
    this.userAuthService.updateAuthStatus(false);
    // Set authentication status to false
    // Remove authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    alert('user logged out')
    this.router.navigate(['/agency']);
  }
}

