import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class DriverCommonService {
  data: any[] = [];
  DriverData:any[]=[]
  userData:any[]=[]
  jobSuccessfull: any;
  jobAccepted: any;
  bookedJob: any
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

  managecargodata: any[] = [];
  cargoID: any;
  userLoginData: any;
  Alldata: any;
  filterData: any;
  Processing: any[] = [];
  Delivered: any[] = [];
  ontheWay: any[] = [];
  signupuserdetail: any;
  
constructor(private coreservice:CoreService) { }
getuserrecord(agencyid: any): void {
  this.coreservice.getOrderAcceptRecordById(agencyid).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.data = response;
        console.log(this.data);
        this.Processing = this.data.filter((data: { status: string }) => data.status === 'Processing');
        const proc = this.Processing.length
        this.jobProcessing.next(proc)
      
        this.ontheWay = this.data.filter((data: { status: string }) => data.status === 'On the Way');
      
        const ontheways = this.ontheWay.length;
        this.JobontheWayCount.next(ontheways)
        this.jobSuccessfull = true;
       
        // localStorage.setItem('bookedJob', JSON.stringify(this.bookedJob))
      } else {

        this.jobSuccessfull = false;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error  fetching data');
      this.jobSuccessfull = false;
    }
  );
}
getAssignDriverrecord(driverId: any): void {
  this.coreservice.getOrderAssignToDriverBydriverId(driverId).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.DriverData = response;
        console.log(this.DriverData);
        // this.Processing = this.data.filter((data: { status: string }) => data.status === 'Processing');
        // const proc = this.Processing.length
        // this.jobProcessing.next(proc)
        this.Delivered =  this.DriverData.filter((data: { status: string }) => data.status === 'Delivered');
        const del = this.Delivered.length
        this.Jobdeliverd.next(del)
        // this.ontheWay = this.data.filter((data: { status: string }) => data.status === 'On the Way');
      
        // const ontheways = this.ontheWay.length;
        // this.JobontheWayCount.next(ontheways)
        // this.jobSuccessfull = true;
       
        // localStorage.setItem('bookedJob', JSON.stringify(this.bookedJob))
      } else {

        // this.jobSuccessfull = false;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error driver fetching data');
      // this.jobSuccessfull = false;
    }
  );
}
getuserBookedRecord(userId: any): void {
  this.coreservice.getUserBookingReacodByID(userId).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.userData.push( response)
                console.log(this.DriverData);
                localStorage.removeItem('userdata');
                localStorage.setItem('userdata', JSON.stringify(response))
      } else {
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error user fetching data');
    }
  );
}
async getmanageCargo(jobId: any) {
  try {
    const response=await this.coreservice.getManageCargoById(jobId).toPromise()
        this.managecargodata = response;
        localStorage.setItem('managecargodata', JSON.stringify(response));
        console.log(response);
        // alert('Data fetched successfully');
    
    
  } catch(error) {
    console.error('Error in async operation:', error);
  }
}

updateManageCartgo(id: any, data: any) {
  this.coreservice.updateMangeCargo(id, data).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}
managecargoTracking(data: any) {
  this.coreservice.manageCargo(data).subscribe(data => {
    console.log(data);
    localStorage.setItem('managecargodata', '')
    localStorage.setItem('managecargodata', JSON.stringify(data))

  })
}
updateJobStatus( data: any) {
  this.coreservice.updateAcceptedOrder( data).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}
updateJobStatusforDriver(id:any, data: any) {
  this.coreservice.OrderReAssignToDriver(id, data).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}
updateJobStatusforUser( data: any) {
  this.coreservice.updateuserOrder( data).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}
}
