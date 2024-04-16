import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyDashService  {
  data: any[]=[];
  jobSuccessfull: any;
  jobAccepted: any;
  bookedJob:any
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
  
  managecargodata: any[]=[];
  cargoID: any;
  userLoginData: any;
  Alldata: any;
  filterData: any;
  Processing: any[]=[];
  Delivered: any[]=[];
  ontheWay: any[]=[];
  signupuserdetail: any;
  constructor(private coreservice :CoreService) {
    const jobcount = localStorage.getItem('jobAccepted');
  if (jobcount) {
    this.jobAcceptedCount.next(JSON.parse(jobcount));
  }
   }
  

   getcargoRecordwithStatus(status: string){
    debugger
    const loginUser=localStorage.getItem('LoginAgency')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
  }) => {
  
      this.getuserrecord(element.id)
      
    });
    
    }  
    if(status==='Processing') {
      this.filterData = this.data.filter((data: { status: string }) => data.status === 'Processing');
    }else if(status==='Pending'){
        this.filterData = this.data.filter((data: { status: string }) => data.status === 'Pending');
}else if(status==='On the Way'){
  this.filterData = this.data.filter((data: { status: string }) => data.status === 'On the Way');
}else{
  this.filterData = this.data.filter((data: { status: string }) => data.status === 'Delivered');
}
      
    
   }
  getuserrecord(userId: any): void {
  this.coreservice.getOrderAcceptRecordById(userId).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.data = response;
   console.log(this.data);
   this.Processing = this.data.filter((data: { status: string }) => data.status === 'Processing');
   const proc=this.Processing.length
   this.jobProcessing.next(proc)
   this.Delivered = this.data.filter((data: { status: string }) => data.status === 'Delivered');
   const del=this.Delivered.length
   this.Jobdeliverd.next(del)
   this.ontheWay = this.data.filter((data: { status: string }) => data.status === 'On the Way');
   const ontheways=this.ontheWay.length
   this.JobontheWayCount.next(ontheways)  
        this.jobSuccessfull = true;
        this.jobAccepted=response && Object.keys(response).length
        this.jobAcceptedCount.next(this.jobAccepted)
        localStorage.removeItem('jobAccepted');
        localStorage.setItem('jobAccepted', this.jobAccepted);
        // localStorage.setItem('bookedJob', JSON.stringify(this.bookedJob))
      } else {
      
        this.jobSuccessfull = false;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error getUserBookingReacod fetching data');
      this.jobSuccessfull = false;
    }
  );
}
managecargoTracking(data:any){
  this.coreservice.manageCargo(data).subscribe(data =>{
    console.log(data);
    
  })
}
updateJobStatus(id: any,data: any){
  this.coreservice.updateAcceptedOrder(id, data).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}
getmanageCargo(userId: any): void {
  this.coreservice.getManageCargoById(userId).subscribe(
    (response) => {
      
      if (response && Object.keys(response).length > 0) {
        // this.managecargodata=[]
        this.managecargodata = response;
        localStorage.setItem('managecargodata', '')
        localStorage.setItem('managecargodata', JSON.stringify(response))
        console.log(response);
        alert('data fetched successfully')
        
        
      } else {
        alert('data not fetched successfully')
      
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
  
        }    );

}
updateManageCartgo(id: any,data: any){
  this.coreservice.updateMangeCargo(id, data).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}
getAgencySignUserData(id:any){
  debugger
  this.coreservice.getsignupAgencyRecordbyid(id).subscribe(
    (response) => {
     console.log(response && Object.keys(response).length );
     
      if (response && Object.keys(response).length > 0) {
     this.signupuserdetail=response
        this.SignupUser.next(this.signupuserdetail)
  console.log(this.signupuserdetail);
  

      }
     
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error getUserBookingReacodtocancel fetching data');
     
    }
  );
}
}
