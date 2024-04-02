import { Component, OnInit } from '@angular/core';
import { AgencyDashService } from '../agency-dash.service';

@Component({
  selector: 'app-on-the-way',
  templateUrl: './on-the-way.component.html',
  styleUrls: ['./on-the-way.component.css']
})
export class OnTheWayComponent implements OnInit {

  constructor(public commonservice:AgencyDashService) { }

  ngOnInit() {
    this.commonservice.getcargoRecordwithStatus('On the Way')
  }

}
