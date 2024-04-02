import { Component, OnInit } from '@angular/core';
import { AgencyDashService } from '../agency-dash.service';

@Component({
  selector: 'app-CompletedJobs',
  templateUrl: './CompletedJobs.component.html',
  styleUrls: ['./CompletedJobs.component.css']
})
export class CompletedJobsComponent implements OnInit {

  constructor(public commonservice:AgencyDashService) { }

  ngOnInit() {
    debugger
    this.commonservice.getcargoRecordwithStatus('Delivered')
  }

}
