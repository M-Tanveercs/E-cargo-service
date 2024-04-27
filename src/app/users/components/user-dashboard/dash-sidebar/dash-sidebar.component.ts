import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/userAuth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.css']
})
export class DashSidebarComponent implements OnInit {
  bookedcount: any;
  canceljobcount: any;
  authstatus: any;
  completedJob: any;

  constructor(public commonservice:DashCommonService,private userAuthService:AuthService ,private router:Router,private message:NzMessageService) { }

  ngOnInit( ) {
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;
   
    
    })
    this.commonservice.jobcountData$.subscribe((data) => {
      this.bookedcount = data;
    
    });
    this.commonservice.jobDeliverCount$.subscribe((data) => {
      this.completedJob = data;
    
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
  
    localStorage.removeItem('isAuthenticated');
    this.message.create('info','Logout Successfully')
        this.router.navigate(['/']);
  }

}
