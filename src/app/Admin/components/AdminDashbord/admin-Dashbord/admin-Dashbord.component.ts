
import { Component, OnInit } from '@angular/core';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';

import { CoreService } from 'src/app/core/core.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  adminName: any;
  pageIndexTab1 = 1;
  totalItemsTab1 = 0;
  pageSizeTab1 = 2;
  jobData: any[] = [];

  // Properties for second tab
  pageIndexTab2 = 1;
  totalItemsTab2 = 0;
  pageSizeTab2 = 2;
  AcceptedJobData: any[] = [];

jobSearch: string = '';
AcceptedjobSearch: any;
  searchResultsFound: boolean=true;
  agncySearchResultsFound: boolean=true;
  bookedcount: any;

  constructor(public commonservice:AdminCommonService,private coreservice:CoreService,private modal: NzModalService ) { 
  
  }
  ngOnInit() {
  debugger
  const loginUser=localStorage.getItem('LoginAdmin')
  if(loginUser){
    const adminData=JSON.parse(loginUser)
    this.adminName=adminData.length>0?adminData[0].name:''
  }
  this.getDashcartData()
  debugger
  console.log(this.jobData);
  console.log(this.getPageDataTab1());
  
  
     this.commonservice.jobAcceptcountData$.subscribe((data) => {
      this.bookedcount = data;
    
    });
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
  async getDashcartData(){
    await this.commonservice.getAllAcceptedJobByAgency()
   await this.commonservice.getAllJobsByUser()
   await this.commonservice.getCanceledJobRecord()
   this.jobData=this.commonservice.userBookingReacod
   this.totalItemsTab1 = this.jobData.length;
   this.AcceptedJobData=this.commonservice.AgencyAcceptedReacod
   this.totalItemsTab2 = this.AcceptedJobData.length;
  }
  getPageDataTab1(): any[] {
    const startIndex = (this.pageIndexTab1 - 1) * this.pageSizeTab1;
    const endIndex = startIndex + this.pageSizeTab1;
    return this.jobData.slice(startIndex, endIndex);
  }
  getPageDataTab2(): any[] {
    const startIndex = (this.pageIndexTab2 - 1) * this.pageSizeTab2;
    const endIndex = startIndex + this.pageSizeTab2;
    return this.AcceptedJobData.slice(startIndex, endIndex);
  }

  // Method to handle page index change
  handlePageIndexChangeTab1(pageIndex: number): void {
    this.pageIndexTab1 = pageIndex;
    // Call method to fetch data for tab 1 with updated pagination state
  }

  handlePageSizeChangeTab1(pageSize: number): void {
    this.pageSizeTab1 = pageSize;
    this.totalItemsTab1 = this.jobData.length;
    // Call method to fetch data for tab 1 with updated pagination state
  }

  handlePageIndexChangeTab2(pageIndex: number): void {
    this.pageIndexTab2 = pageIndex;
    // Implement pagination logic for tab 2 similar to handlePageIndexChangeTab1()
  }

  handlePageSizeChangeTab2(pageSize: number): void {
    // Implement pagination logic for tab 2 similar to handlePageSizeChangeTab1()
    this.pageSizeTab2 = pageSize;
    this.totalItemsTab2 = this.AcceptedJobData.length;
  }

  // drawer
  visible1 = false;
  visible2 = false;
  size: 'large'  = 'large';

  get title2(): string {
    return `Job Details`;
  }
  get title1(): string {
    return `Job Details`;
  }
 

 

  showLarge1(item:any): void {
    this.selectedCartItem =item
    this.size = 'large';
    this.open1();
  }

  open1(): void {
    this.visible1 = true;
  }

  close1(): void {
    this.visible1 = false;
  }
  
  showLarge2(item:any): void {
    this.selectedCartItem =item
    this.size = 'large';
    this.open2();
  }

  open2(): void {
    this.visible2 = true;
  }

  close2(): void {
    this.visible2 = false;
  }
  showDeleteConfirm(id:any): void {
    // this.userid=id
    this.modal.confirm({
      nzTitle: 'Job delete Notification',
      nzContent: '<b style="color: red;">Are you sure delete this detail?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.confirmDelete(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  async confirmDelete(id: string){
await this.coreservice.deletecancelRecord(id).toPromise()
await this.commonservice.getCanceledJobRecord()
  }
  async searchJobs() {
    await this.commonservice.getAllJobsByUser()
  debugger
    this.jobData=this.commonservice.userBookingReacod
    this.totalItemsTab1 = this.jobData.length;
      // Replace [] with your original list of jobs if you want to reset to the original list

      this.jobData = this.jobData.filter(job => job.id.toLowerCase().includes(this.jobSearch.toLowerCase()));
      console.log(this.jobData);
      // this.searchResultsFound = this.jobData.length > 0;
      if(this.jobData.length=== 0){
        this.searchResultsFound=false
      }else{
        this.searchResultsFound=true
      }
      
    
  }
  async searchAcceptJobs() {
    debugger
    await this.commonservice.getAllAcceptedJobByAgency()
    this.AcceptedJobData=this.commonservice.AgencyAcceptedReacod
    this.totalItemsTab2 = this.AcceptedJobData.length;
      this.AcceptedJobData = this.AcceptedJobData.filter(job => job.jobid.toLowerCase().includes(this.AcceptedjobSearch.toLowerCase()));
      if(this.AcceptedJobData.length=== 0){
        this.agncySearchResultsFound=false
      }else{
        this.agncySearchResultsFound=true
      }
  }
 
}


