import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';

@Component({
  selector: 'app-delivered-jobs',
  templateUrl: './delivered-jobs.component.html',
  styleUrls: ['./delivered-jobs.component.css']
})
export class DeliveredJobsComponent implements OnInit {

  constructor(public commonservice:AdminCommonService) { }

  ngOnInit() {
    debugger
    this.commonservice.getcargoRecordwithStatus('Delivered')
  }

}
