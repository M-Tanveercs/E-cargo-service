import { Component, OnInit } from '@angular/core';
import { AgencyCommonService } from '../../agency-common.service';

@Component({
  selector: 'app-moreInfoAboutJob',
  templateUrl: './moreInfoAboutJob.component.html',
  styleUrls: ['./moreInfoAboutJob.component.css']
})
export class MoreInfoAboutJobComponent implements OnInit {
  jobs:any
  jobArray: any[] = []; 
  constructor(public commonService:AgencyCommonService) { }

  ngOnInit() {
    this.commonService.CurentJob$.subscribe(job => {
      console.log("curentJob",job);
      // this.jobs = Object.entries(job).map(([key, value]) => ({ key, value }))
      // this.jobs = job;
      this.jobArray.push(job); 
    })  
  }

}
