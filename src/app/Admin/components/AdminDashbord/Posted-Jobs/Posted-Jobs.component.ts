import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';

@Component({
  selector: 'app-Posted-Jobs',
  templateUrl: './Posted-Jobs.component.html',
  styleUrls: ['./Posted-Jobs.component.css']
})
export class PostedJobsComponent implements OnInit {

  constructor(public commonservice:AdminCommonService) { }

  ngOnInit() {
   this.getData()
  }
 async getData(){
    await this.commonservice.getAllJobsByUser()
  }

}
