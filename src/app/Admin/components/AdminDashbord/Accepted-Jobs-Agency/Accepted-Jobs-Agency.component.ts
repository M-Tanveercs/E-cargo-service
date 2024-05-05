import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';


@Component({
  selector: 'app-Accepted-Jobs-Agency',
  templateUrl: './Accepted-Jobs-Agency.component.html',
  styleUrls: ['./Accepted-Jobs-Agency.component.css']
})
export class AcceptedJobsAgencyComponent implements OnInit {

  userLoginData: any;

  constructor(public commonservice:AdminCommonService) { }

  ngOnInit() {
    debugger
    
this.commonservice.getAllAcceptedJobByAgency()    
  }
  }