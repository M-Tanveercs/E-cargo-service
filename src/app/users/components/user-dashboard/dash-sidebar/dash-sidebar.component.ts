import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/userAuth.service';

@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.css']
})
export class DashSidebarComponent implements OnInit {
  bookedcount: any;
  canceljobcount: any;
  authstatus: any;

  constructor(public commonservice:DashCommonService,private userAuthService:AuthService ,private router:Router) { }

  ngOnInit( ) {
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;
   
    
    })
    this.commonservice.jobcountData$.subscribe((data) => {
      this.bookedcount = data;
    
    });
   this.commonservice.canceljobcountData$.subscribe((data)=>{
    this.canceljobcount=data
   })
  
  }

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  theme = false;
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
