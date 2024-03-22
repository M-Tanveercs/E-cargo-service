import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/users/userAuth.service';
import { DashCommonService } from '../dash-common.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {
  username: any;
  userLoginData: any;
  bookedcount: any;

  constructor(private userAuthService:UserAuthService, private router:Router ,public commonservice:DashCommonService) { }

  ngOnInit() {
    debugger
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
    this.userAuthService.Athenticate=false;
    alert('user logged out')
    this.router.navigate(['/']);
  }
}
