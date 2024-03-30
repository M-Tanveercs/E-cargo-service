import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashCommonService } from '../dash-common.service';
import { AuthService } from 'src/app/users/userAuth.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {
  username: any;
  userLoginData: any;
  bookedcount: any;
  authstatus: any;

  constructor(private userAuthService:AuthService, private router:Router ,public commonservice:DashCommonService) { }

  ngOnInit() {
    debugger
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;

    
    })
    const loginUser=localStorage.getItem('LoginUser')
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
  this.commonservice.jobcountData$.subscribe((data) => {
    this.bookedcount = data;

  });
}
  logout(){
    localStorage.setItem('LoginUser','')
    this.userAuthService.updateAuthStatus(false);
    // Set authentication status to false
    // Remove authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    alert('user logged out')
    this.router.navigate(['/']);
  }
}
