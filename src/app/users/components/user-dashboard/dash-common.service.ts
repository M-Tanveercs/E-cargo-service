import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class DashCommonService implements OnInit {
  data: any[]=[];
  userLoginData: any;
  username: any;
  orderSuccessful: boolean=false
  bookedJob: any;
  canceljobs: any;
  allCanceljobs: any;
  canceljobcount: any;
  private bookedJobCount = new BehaviorSubject<any>(null);
  jobcountData$ = this.bookedJobCount.asObservable();
  private cancelJobCounts = new BehaviorSubject<any>(null);
  canceljobcountData$ = this.cancelJobCounts.asObservable();
 
  private SignupUser = new BehaviorSubject({});
  signUpUserData$ = this.SignupUser.asObservable();
  signupuserdetail: any;
 
constructor( private coreservice:CoreService) { }
ngOnInit(): void {
 
}
getuserrecord(userId: any): void {
  this.coreservice.getUserBookingReacod(userId).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.data = response;
   console.log(this.data);
   
        this.orderSuccessful = true;
        this.bookedJob=response && Object.keys(response).length
        this.bookedJobCount.next(this.bookedJob)
        // localStorage.setItem('bookedJob', JSON.stringify(this.bookedJob))
      } else {
      
        this.orderSuccessful = false;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error getUserBookingReacod fetching data');
      this.orderSuccessful = false;
    }
  );
}
getuserrecordforCancel(id: any): void {
  debugger
  this.coreservice.getUserBookingReacodtocancel(id).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.canceljobs = response;
        this.jobcanceled(response)
   console.log( this.canceljobs);
   this.deleteUser(id)

   
      } 
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error getUserBookingReacodtocancel fetching data');
     
    }
  );
}

deleteUser(Id: any): void {
  this.coreservice.deleteUserRecord(Id).subscribe(
    () => {
      console.log('User record deleted successfully');
      // Handle success as needed
      alert('User cancel job successfully')
    },
    (error) => {
      console.error('Error deleting user record:', error);
      // Handle error as needed
    }
  );
}
jobcanceled(data: any){
console.log(data);

  this.coreservice.createUserBookingcancelReacod(data).subscribe(data=>{
    console.log('canceljob',data);
})}
getcurentcancelorder(id: any): void {
  debugger
  this.coreservice.getUserBookingCanceldRecod(id).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.allCanceljobs = response;
   this.canceljobcount=response && Object.keys(response).length ;
   this.cancelJobCounts.next(this.canceljobcount)
 
 console.log("all cancel recod",this.allCanceljobs);
 

   
      } 
    },
    (error) => {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
     
    }
  );
}



  deletedrecod(Id: any): void {
  this.coreservice.deletecancelRecord(Id).subscribe(
    () => {
      console.log('User record deleted successfully');
      // Handle success as needed
      alert('User cancel job successfully')
    },
    (error) => {
      console.error('Error deleting user record:', error);
      // Handle error as needed
    }
  );}
  getSignUserData(id:any){
    debugger
    this.coreservice.getsignupUserRecordById(id).subscribe(
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
