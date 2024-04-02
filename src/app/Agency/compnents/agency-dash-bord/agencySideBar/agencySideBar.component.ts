import { Component, OnInit } from '@angular/core';
import { AgencyDashService } from '../agency-dash.service';
import { Router } from '@angular/router';
import { AgencyAuthService } from 'src/app/Agency/agencyAuthGard/agency-auth.service';

@Component({
  selector: 'app-agencySideBar',
  templateUrl: './agencySideBar.component.html',
  styleUrls: ['./agencySideBar.component.css']
})
export class AgencySideBarComponent implements OnInit {
  bookedcount: any;
  canceljobcount: any;
  authstatus: any;

  constructor(public commonservice:AgencyDashService,private userAuthService:AgencyAuthService ,private router:Router) { }

  ngOnInit( ) {
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;
   
    
    })
    this.commonservice.jobAcceptcountData$.subscribe((data) => {
      this.bookedcount = data;
    
    });
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
    alert('user logged out')
    this.router.navigate(['/agency']);
  }

}
