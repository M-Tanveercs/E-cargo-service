import { Injectable, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { BehaviorSubject, Subject , map, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyCommonService implements OnInit {
  data: any;

  private JobRecord = new BehaviorSubject([]);
  AllJobs$ = this.JobRecord.asObservable();
  private CurentJobRecord = new BehaviorSubject({});
  CurentJob$ = this.CurentJobRecord.asObservable();
  private AgencyJobRecord = new BehaviorSubject({});
  AllagencyJob$ = this.AgencyJobRecord.asObservable();
  curentCartdata: any;
  searchText: any;
  searchSubject = new Subject();
  AgencyLoginData: any;
  agencyid: any;
  currentOrderArray: any[]=[];
  agencyjobs: any;
  signupuserdetail: any;
  job: any[]=[]
  constructor(private coreservice: CoreService) { }

  ngOnInit(): void {
  
   

  }
  // getAllJobs() {
  //   this.coreservice.getAllUserBookingReacod().subscribe(
  //     (response) => {
  //       if (response && Object.keys(response).length > 0) {
  //         this.data = response;
  //         this.JobRecord.next(response);
  //         console.log("all data:",this.data);
  //       } else {

  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);


  //     }
  //   );


  // }

// Assuming you have imports for BehaviorSubject and Observable


// Assuming you have imports for BehaviorSubject and Observable

// Function to filter out records
filterAgencyJobs(allJobs: any[], agencyJobs: any[]): any[] {
  return allJobs.filter(job => !agencyJobs.some(agencyJob => agencyJob.id === job.id));
}

// Modify getAllJobs to filter out agency jobs
getAllJobs() {
  this.coreservice.getAllUserBookingReacod().pipe(
    map((allJobs: any[]) => {
      if (this.agencyjobs && this.agencyjobs.length > 0) {
        // Filter out jobs that are also in the agency jobs data
        return allJobs.filter(job => !this.agencyjobs.some((agencyJob: {jobid: any; }) => agencyJob.jobid === job.id));
      } else {
        // If there are no agency jobs data, return all jobs
        return allJobs;
      }
    })
  ).subscribe(
    (response: any) => {
      // Update the records with filtered jobs
      this.JobRecord.next(response);
      console.log("All non-agency jobs:", response);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


// Call getAllJobs and getAllAgencyJobs wherever necessary



// Call getAllJobs and getAllAgencyJobs wherever necessary

  getAllAgencyJobs() {
    this.coreservice.getOrderAcceptAgency().subscribe(
      (response) => {
        if (response && Object.keys(response).length > 0) {
          this.agencyjobs = response;
          this.AgencyJobRecord.next(response);
          console.log("all data:",this.data);
        } else {

        }
      },
      (error) => {
        console.error('Error fetching data:', error);


      }
    );


  }
  // getSearchString(searchText: any) {
  //   this.searchText = searchText;
  //   console.log(this.searchText);
  //   this.searchSubject.next(this.searchText);
  // }
  async GetCurentJob(jobid: string) {
    debugger
   try{
    this.curentCartdata= await this.coreservice.getUserBookingReacodByID(jobid).toPromise() 
    this.CurentJobRecord.next(this.curentCartdata);
   } catch(error)  {
        console.error('Error fetching data:', error);


      }
    

  }
  orderAccept(jobid: any) {
    const getrecord = localStorage.getItem('LoginAgency');
    if (getrecord) {
      this.AgencyLoginData = JSON.parse(getrecord);
      this.AgencyLoginData.forEach((data: { id: any }) => {
        this.agencyid = data.id;
        console.log("agency id", data.id);
      });
    }
  
    this.GetCurentJob(jobid);
  
    const randomFourDigitNumber = this.generateRandomFourDigitNumber();
    console.log(randomFourDigitNumber);
  
    this.curentCartdata.agencyid = this.agencyid;
    this.curentCartdata.jobid = this.curentCartdata.id;
    this.curentCartdata.id = randomFourDigitNumber;
    this.curentCartdata.status = 'pending';
  
    const order = this.curentCartdata;
  
    this.coreservice.OrderAcceptAgency(this.curentCartdata).pipe(
      catchError(error => {
        console.error('Error accepting order:', error);
        // Handle the error as needed, for example, throw a custom error
        return throwError('Failed to accept order. Please try again.');
      })
    ).subscribe(data => {
      console.log(data);
      alert("Order accepted");
      this.getAllJobs();
      this.AllJobs$.subscribe(jobs => this.job = jobs);
    });
  }
 generateRandomFourDigitNumber(): number {
  const min = 1000; // Minimum 4-digit number (1000)
  const max = 9999; // Maximum 4-digit number (9999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Output a random 4-digit number


}
