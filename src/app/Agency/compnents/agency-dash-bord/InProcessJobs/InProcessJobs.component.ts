import { Component, OnInit } from '@angular/core';
import { AgencyDashService } from '../agency-dash.service';

@Component({
  selector: 'app-InProcessJobs',
  templateUrl: './InProcessJobs.component.html',
  styleUrls: ['./InProcessJobs.component.css']
})
export class InProcessJobsComponent implements OnInit {
 
  constructor(public commonservice:AgencyDashService) { }

  ngOnInit() {
    debugger
    this.commonservice.getcargoRecordwithStatus('Processing')
    // Assuming this is within a method in your component

  
  }

  

}
