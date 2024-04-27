import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';
import { CoreService } from 'src/app/core/core.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: any;
  userLoginData: any;
  status: any;
  userorderid: any;
  curentStatus: any;
  userid: any;
  isVisible = false;
  selectedValue:any;
  reason: any;
  jobdeliverCount: any;

  constructor(public commonservice:DashCommonService,private coreservice:CoreService,private modalService: NzModalService) { }

  ngOnInit() {
    debugger
    this.commonservice.spinner()
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
  }) => {
      this.username=element.fullname
this.userid=element.id
      this.commonservice.getuserrecord(element.id)
      debugger
    });
   
    }
    this.coreservice.orderCancelReason().subscribe((responce)=>{
      this.reason=responce
    })
    this.commonservice.jobDeliverCount$.subscribe((responce)=>{
      this.jobdeliverCount=responce
    })
  }
 
  showDeleteConfirm(id:any): void {
    this.isVisible = true;
    this.userid=id
  }

  handleOk(): void {
    this.isVisible = false;
    this.cancel(this.userid);
console.log("selected value:",this.selectedValue);
    
  }

  handleCancel(): void {
    this.isVisible = false;
  }
 
  cancel(id:any): void {
    debugger
    console.log('OK button clicked');
  
    this.commonservice.cancelReason=this.selectedValue
  this.commonservice.getuserrecordforCancel(id)
  this.commonservice.getuserrecord(this.userid)
}
}
  
