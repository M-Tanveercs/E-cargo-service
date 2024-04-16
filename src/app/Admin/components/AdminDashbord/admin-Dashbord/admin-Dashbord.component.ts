
import { Component, OnInit } from '@angular/core';
import { AgencyDashService } from 'src/app/Agency/compnents/agency-dash-bord/agency-dash.service';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-admin-Dashbord',
  templateUrl: './admin-Dashbord.component.html',
  styleUrls: ['./admin-Dashbord.component.css']
})
export class AdminDashbordComponent implements OnInit {

  username: any;
  userLoginData: any;
  jobcount: any;
  selectedCartItem: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;

  constructor(public commonservice:AgencyDashService,private coreservice:CoreService, ) { }
  ngOnInit() {
  debugger
  const loginUser=localStorage.getItem('LoginAgency')
  if(loginUser) {
  this.userLoginData=JSON.parse(loginUser)
  this.userLoginData.forEach((element: {
    id: any; fullname: any; 
}) => {
    this.username=element.fullname

    this.commonservice.getuserrecord(element.id)
  });
  console.log(this.username);
  
  }
  this.commonservice.jobAcceptcountData$.subscribe(data => {
  this.jobcount = data
  })
  this.commonservice.jobProcessingcount$.subscribe(data => {
  this.jobproc = data
  })
  this.commonservice.jobonthewaycount$.subscribe(data => {
  this.jobontheway = data
  })
  this.commonservice.jobDeliverCount$.subscribe(data => {
  this.jobdelv = data
  })
   
  }


  // drawer
  visible = false;
  size: 'large'  = 'large';

  get title(): string {
    return `Job Details`;
  }

 

  showLarge(item:any): void {
    this.selectedCartItem =item
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  
}


