import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyDashService {
  data: any;
  jobSuccessfull: any;
  jobAccepted: any;
  bookedJob:any
  private jobAcceptedCount = new BehaviorSubject<any>(null);
  jobAcceptcountData$ = this.jobAcceptedCount.asObservable();
  constructor(private coreservice :CoreService) {
    const jobcount = localStorage.getItem('jobAccepted');
  if (jobcount) {
    this.jobAcceptedCount.next(JSON.parse(jobcount));
  }
   }
  getuserrecord(userId: any): void {
  this.coreservice.getOrderAcceptRecordById(userId).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.data = response;
   console.log(this.data);
   
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
}
