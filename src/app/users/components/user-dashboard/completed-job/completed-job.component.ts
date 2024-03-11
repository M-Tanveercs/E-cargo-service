import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-job',
  templateUrl: './completed-job.component.html',
  styleUrls: ['./completed-job.component.css']
})
export class CompletedJobComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  jobCompleted:boolean=true

}
