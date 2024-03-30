import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { DashCommonService } from 'src/app/users/components/user-dashboard/dash-common.service';

@Component({
  selector: 'app-AgencyDashBord',
  templateUrl: './AgencyDashBord.component.html',
  styleUrls: ['./AgencyDashBord.component.css']
})
export class AgencyDashBordComponent implements OnInit {
  username: any;
  userLoginData: any;

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
  });
  console.log(this.username);
  
  }
   
  }
}
