import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';

@Component({
  selector: 'app-admin-main-dash',
  templateUrl: './admin-main-dash.component.html',
  styleUrls: ['./admin-main-dash.component.css']
})
export class AdminMainDashComponent implements OnInit {

  constructor(public commonservice:AdminCommonService) { }

  ngOnInit() {
  }

}
