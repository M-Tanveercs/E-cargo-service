import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';
import { UserAuthService } from 'src/app/users/userAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.css']
})
export class DashSidebarComponent implements OnInit {
  bookedcount: any;
  canceljobcount: any;

  constructor(public commonservice:DashCommonService,private userAuthService:UserAuthService ,private router:Router) { }

  ngOnInit( ) {
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
    this.userAuthService.Athenticate=false;
    alert('user logged out')
    this.router.navigate(['/']);
  }

}
