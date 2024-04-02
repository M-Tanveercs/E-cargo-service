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
    debugger
    this.commonservice.getcargoRecordwithStatus('Pending')
 }
 }
