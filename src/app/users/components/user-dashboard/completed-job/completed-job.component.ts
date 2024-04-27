import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';

@Component({
  selector: 'app-completed-job',
  templateUrl: './completed-job.component.html',
  styleUrls: ['./completed-job.component.css']
})
export class CompletedJobComponent implements OnInit {

  constructor(public commonservice:DashCommonService) { }

  ngOnInit() {
    this.commonservice.getcargoRecordwithStatus('Delivered')
  }
  jobCompleted:boolean=true

}
