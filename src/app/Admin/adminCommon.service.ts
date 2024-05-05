import { Injectable } from '@angular/core';
import { CoreService } from '../core/core.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCommonService {
userBookingReacod: any[]=[];
  bookedJob: any;
  AgencyAcceptedReacod: any[]=[];
  AccepetedJob: any;
  canceledJob: any;
  canceledJobsData: any[]=[];
  data: any[] = [];
  jobSuccessfull: any;
  jobAccepted: any;
  isCollapsed = false;
  private SignupUser = new BehaviorSubject({});
  signUpUserData$ = this.SignupUser.asObservable();
  private jobAcceptedCount = new BehaviorSubject<any>(null);
  jobAcceptcountData$ = this.jobAcceptedCount.asObservable();

  private jobProcessing = new BehaviorSubject<any>(null);
  jobProcessingcount$ = this.jobProcessing.asObservable();

  private JobontheWayCount = new BehaviorSubject<any>(null);
  jobonthewaycount$ = this.JobontheWayCount.asObservable();

  private Jobdeliverd = new BehaviorSubject<any>(null);
  jobDeliverCount$ = this.Jobdeliverd.asObservable();

  orderSuccessful: boolean=false
  managecargodata: any[] = [];
  private managecargodatas = new BehaviorSubject<any>(null);
  managecargodata$ = this.managecargodatas.asObservable();
  cargoID: any;
  userLoginData: any;
  Alldata: any;
  filterData: any;
  Processing: any[] = [];
  Delivered: any[] = [];
  ontheWay: any[] = [];
  signupuserdetail: any;
userdata: any;
  proc: any;
  del: any;
  ontheways: any;
  allRegiteredUser: any[]=[];
  allRegiteredAgency: any[]=[];
  RegisteredUser: any;
  RegisteredAgency: any;

constructor(private coreservice:CoreService) { }

async getAllJobsByUser(){
  try {
  const response = await this.coreservice.getAllUserBookingReacod().toPromise()
if((response && Object.keys(response).length > 0)){
  this.userBookingReacod = response
  this.bookedJob=response && Object.keys(response).length
}  
}catch(e){
  console.log('error', e);
  
}
}
async getAllAcceptedJobByAgency(){
  try {
  const response = await this.coreservice.getOrderAcceptAgency().toPromise()
if((response && Object.keys(response).length > 0)){
  this.AgencyAcceptedReacod = response
  this.AccepetedJob=response && Object.keys(response).length
}  
}catch(e){
  console.log('error', e);
  
}
}
async getCanceledJobRecord(){
  try{
    const response= await this.coreservice.getCanceldRecod().toPromise()
    if((response && Object.keys(response).length > 0)){
      this.canceledJobsData = response
      this.canceledJob=response && Object.keys(response).length
    } 
  }catch(error){

  }
}
async getcargoRecordwithStatus(status: string) {
 

      await this.getuserrecord()

  
  if (status === 'Processing') {
    this.filterData = this.data.filter((data: { status: string }) => data.status === 'Processing');
  } else if (status === 'Pending') {
    this.filterData = this.data.filter((data: { status: string }) => data.status === 'Pending');
  } else if (status === 'On the Way') {
    this.filterData = this.data.filter((data: { status: string }) => data.status === 'On the Way');
  } else {
    this.filterData = this.data.filter((data: { status: string }) => data.status === 'Delivered');
  }


}
async getuserrecord() {
  try {
 const response= await this.coreservice.getOrderAcceptAgency().toPromise()
      if (response && Object.keys(response).length > 0) {
        this.data = response;
        console.log(this.data);
        this.Processing = this.data.filter((data: { status: string }) => data.status === 'Processing');
        this.proc = this.Processing.length
        this.jobProcessing.next(this.proc)
        this.Delivered = this.data.filter((data: { status: string }) => data.status === 'Delivered');
        this.del = this.Delivered.length
        this.Jobdeliverd.next(this.del)
        this.ontheWay = this.data.filter((data: { status: string }) => data.status === 'On the Way');
        // this.data.forEach((data) => {
        //   this.findDriverName(data);
        // })
        this.ontheways = this.ontheWay.length;
        this.JobontheWayCount.next(this.ontheways)
        this.jobSuccessfull = true;
        this.jobAccepted = response && Object.keys(response).length
        this.jobAcceptedCount.next(this.jobAccepted)
        localStorage.removeItem('jobAccepted');
        localStorage.setItem('jobAccepted', this.jobAccepted);
        // localStorage.setItem('bookedJob', JSON.stringify(this.bookedJob))
      } else {

        this.jobSuccessfull = false;
      }
    }catch
    (error) {
      console.error('Error fetching data:', error);
      alert('Error getUserBookingReacod fetching data');
      this.jobSuccessfull = false;
    }
  
}
async getAllRegisteredUser(){
  try {
  const response = await this.coreservice.getsignupUserRecord().toPromise()
if((response && Object.keys(response).length > 0)){
  this.allRegiteredUser = response
  this.RegisteredUser=response && Object.keys(response).length
}  
}catch(e){
  console.log('error', e);
  
}
}
async getAllRegisteredAgency(){
  try {
  const response = await this.coreservice.getsignupAgencyRecord().toPromise()
if((response && Object.keys(response).length > 0)){
  this.allRegiteredAgency = response
  this.RegisteredAgency=response && Object.keys(response).length
}  
}catch(e){
  console.log('error', e);
  
}
}
}
