import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { AgencyDashService } from '../agency-dash.service';


@Component({
  selector: 'app-AgencyDashBord',
  templateUrl: './AgencyDashBord.component.html',
  styleUrls: ['./AgencyDashBord.component.css']
})
export class AgencyDashBordComponent implements OnInit {
  username: any;
  userLoginData: any;
  jobcount: any;
  selectedCartItem: any;

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
