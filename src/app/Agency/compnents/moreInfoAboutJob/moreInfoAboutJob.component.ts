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
      // this.jobs = Object.entries(job).map(([key, value]) => ({ key, value }))
      // this.jobs = job;
      console.log(job);
      this.jobArray=[]
      this.jobArray.push(job); 
      console.log("curentJob",this.jobArray);
    })  
  }

  orderAccept(id:any){
    this.commonService.orderAccept(id)
  }
}
