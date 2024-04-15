import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { DashCommonService } from '../dash-common.service';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-cancelJobs',
  templateUrl: './cancelJobs.component.html',
  styleUrls: ['./cancelJobs.component.css']
})
export class CancelJobsComponent implements OnInit {
  userLoginData: any;
  userid: any;
 

  constructor(private coreservice:CoreService, public commonservice:DashCommonService,private modal: NzModalService) { }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginUser')
   if(loginUser) {
   this.userLoginData=JSON.parse(loginUser)
   this.userLoginData.forEach((element: {
     id: any; fullname: any; 
}) => {
 
   this.commonservice.getcurentcancelorder(element.id)
   });
  
  }
   }

   showDeleteConfirm(id:any): void {
    this.userid=id
    this.modal.confirm({
      nzTitle: 'Job delete Notification',
      nzContent: '<b style="color: red;">Are you sure delete this detail?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.confirmDelete(this.userid),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  confirmDelete(userid: string){
this.commonservice.deletedrecod(userid)
  }
}
