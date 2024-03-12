import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';

@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.css']
})
export class DashSidebarComponent implements OnInit {

  constructor(public commonservice:DashCommonService) { }

  ngOnInit() {
  }

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  theme = false;
  
}
