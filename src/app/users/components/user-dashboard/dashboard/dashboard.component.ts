import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: any;
  userLoginData: any;
  status: any;
  userorderid: any;
  curentStatus: any;

  constructor(public commonservice:DashCommonService,private coreservice:CoreService, ) { }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
  }) => {
      this.username=element.fullname

      this.commonservice.getuserrecord(element.id)
      debugger
    });
   
    }

 
  


   
 
  }}
  
