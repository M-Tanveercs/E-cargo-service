import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { DashCommonService } from '../dash-common.service';

@Component({
  selector: 'app-cancelJobs',
  templateUrl: './cancelJobs.component.html',
  styleUrls: ['./cancelJobs.component.css']
})
export class CancelJobsComponent implements OnInit {
  userLoginData: any;
 

  constructor(private coreservice:CoreService, public commonservice:DashCommonService) { }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginUser')
   if(loginUser) {
   this.userLoginData=JSON.parse(loginUser)
   this.userLoginData.forEach((element: {
     id: any; fullname: any; 
}) => {
 
   this.commonservice.getcurentcancelorder(element.id)
   });
  
  }
   }
}
