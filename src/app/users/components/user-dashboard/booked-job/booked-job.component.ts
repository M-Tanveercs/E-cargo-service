import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';

@Component({
  selector: 'app-booked-job',
  templateUrl: './booked-job.component.html',
  styleUrls: ['./booked-job.component.css']
})
export class BookedJobComponent implements OnInit {
  userLoginData: any;

  constructor(public commonservice:DashCommonService) { }

  ngOnInit() {
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
  }) => {


      this.commonservice.getuserrecord(element.id)
    });

    
    }
  }

}
