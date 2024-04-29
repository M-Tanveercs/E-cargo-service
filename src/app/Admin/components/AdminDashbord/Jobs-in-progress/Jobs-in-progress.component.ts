import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from '../../../adminCommon.service';

@Component({
  selector: 'app-Jobs-in-progress',
  templateUrl: './Jobs-in-progress.component.html',
  styleUrls: ['./Jobs-in-progress.component.css']
})
export class JobsInProgressComponent implements OnInit {


  constructor(public commonservice:AdminCommonService) { }

  ngOnInit() {
    debugger
    this.commonservice.getcargoRecordwithStatus('Processing')
    // Assuming this is within a method in your component

  
  }

  

}