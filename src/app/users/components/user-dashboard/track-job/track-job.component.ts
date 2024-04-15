import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashCommonService } from '../dash-common.service';

import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-track-job',
  templateUrl: './track-job.component.html',
  styleUrls: ['./track-job.component.css']
})
export class TrackJobComponent implements OnInit {
  jobId: any;
  pickupdate: any;
  pickuptime: any;
  datePickup: any;
  timePickup: any;
  userLoginData: any;
  trackingid: any;
  status: any;
  curentvalue: any;
prof: any;
sign: any;
  deliveryProf: any;
  ReciverSignature: any;
show: boolean=false;
  src:any;

  constructor(private route: ActivatedRoute,private commonservice:DashCommonService,private nzImageService: NzImageService) { }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
      this.commonservice.getmanageCargo(this.jobId)
    
    });
  // Assuming you want to display the date and time of the first element in managecargodata
  this.commonservice.managecargodata.forEach((element: {
    trackingId: any;
    id: any; 
}) => {

// this.cargoId=element.id; 
this.trackingid=element.trackingId
// alert(this.cargoId); 


  });
  if (this.trackingid===this.jobId) {
const element = this.commonservice.managecargodata[0]; // Get the first element

const date = new Date(element.currentDate);
const time = new Date(element.pickuptime);
this.datePickup = date.toLocaleDateString('en-US');
this.timePickup = time.toLocaleTimeString('en-US');
this.deliveryProf=element.deliveryProof
console.log(this.deliveryProf);
this.ReciverSignature=element.reciverSignature
console.log(this.ReciverSignature);
this.status=element.cargoStatus
if (this.status==='Processing' ) {
  this.curentvalue=3
}else if(this.status==='On the Way'){
  this.curentvalue=4
}else if(this.status==='Delivered'){
  this.curentvalue=7
}else{
  this.curentvalue=1
}
}

  }
  
  onClick(imageType: string): void {
    if (imageType === 'prof') {
    this.src = this.deliveryProf;
    this.show=true
    } else if (imageType === 'sign') {
     this.src = this.ReciverSignature;
    }
    
    
  }

}
