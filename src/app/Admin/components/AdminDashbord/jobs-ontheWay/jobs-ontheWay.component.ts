import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';

@Component({
  selector: 'app-jobs-ontheWay',
  templateUrl: './jobs-ontheWay.component.html',
  styleUrls: ['./jobs-ontheWay.component.css']
})
export class JobsOntheWayComponent implements OnInit {

  constructor(public commonservice:AdminCommonService) { }

  ngOnInit() {
    this.commonservice.getcargoRecordwithStatus('On the Way')
  }

}
