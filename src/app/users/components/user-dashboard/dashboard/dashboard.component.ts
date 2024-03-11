import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public commonservice:DashCommonService) { }

  ngOnInit() {
  }
  

}
