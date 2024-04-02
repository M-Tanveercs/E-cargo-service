import { Component, OnInit } from '@angular/core';
import { AgencyDashService } from '../agency-dash.service';

@Component({
  selector: 'app-Accepted-jobs',
  templateUrl: './Accepted-jobs.component.html',
  styleUrls: ['./Accepted-jobs.component.css']
})
export class AcceptedJobsComponent implements OnInit {

  userLoginData: any;

  constructor(public commonservice:AgencyDashService) { }

  ngOnInit() {
    const loginUser=localStorage.getItem('LoginAgency')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
  }) => {


      this.commonservice.getuserrecord(element.id)
    });

    
    }
  }}
