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
  private managecargodatas = new BehaviorSubject<any>(null);
  managecargodata$ = this.managecargodatas.asObservable();
  private SignupUser = new BehaviorSubject({});
  signUpUserData$ = this.SignupUser.asObservable();
  signupuserdetail: any;
  managecargodata: any;
  statusData: any;
  loading: boolean=true
  cancelReason: any;
  userdata: any;
  excludedFields = ['_id', '__v'];
  private Jobdeliverd = new BehaviorSubject<any>(null);
  jobDeliverCount$ = this.Jobdeliverd.asObservable();
  private JobCancel = new BehaviorSubject<any>(null);
  jobCancel$ = this.JobCancel.asObservable();
  Delivered: any;
  filterData: any[]=[];
  show: boolean=false;
constructor( private coreservice:CoreService) {
  const jobcount = localStorage.getItem('jobcount');
  if (jobcount) {
    this.bookedJobCount.next(JSON.parse(jobcount));
  }

 }
ngOnInit(): void {

}
// getmanageCargo(userId: any): void {
//   this.coreservice.getManageCargoById(userId).subscribe(
//     (response) => {
      
//       if (response && Object.keys(response).length > 0) {
//         // this.managecargodata=[]
//         this.managecargodata = response;
//         localStorage.setItem('trackingData', '')
//         localStorage.setItem('trackingdata', JSON.stringify(  this.managecargodata));

//         console.log(response);
//         // alert('data fetched successfully')
        
        
//       } else {
//         alert('data not fetched successfully')
      
//       }
//     },
//     (error) => {
//       console.error('Error fetching data:', error);
  
//         }    );

// }
// getuserrecordstatus(userid: any): void {
//   this.coreservice.getOrderAcceptRecordById(userid,'userId').subscribe(
//     (response) => {
//       if (response && Object.keys(response).length > 0) {
//         this.statusData = response;
//    console.log(this.data);
  
 
   
//       } else {
      
//       }
//     },
//     (error) => {
//       console.error('Error fetching data:', error);
//       alert('Error getUserBookingReacod fetching data');
//     }
//   );
// }
async getmanageCargo(userId: any) {
  try {
    const response = await this.coreservice.getManageCargoById(userId).toPromise();

    if (response && Object.keys(response).length > 0) {
this.managecargodatas.next(response)
      this.managecargodata = response;
      localStorage.setItem('managecargodata', '');
      localStorage.setItem('managecargodata', JSON.stringify(response));
      console.log(response);
      
      // alert('data fetched successfully')
    } else {
      // alert('data not fetched successfully')
    }
  } catch (error) {
    console.error('Error in async operation:', error);
  }
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
        localStorage.removeItem('jobcount');
        localStorage.setItem('jobcount', this.bookedJob);
        // localStorage.setItem('bookedJob', JSON.stringify(this.bookedJob))
        this.Delivered = this.data.filter((data: { status: string }) => data.status === 'Delivered');
      const del = this.Delivered.length
      this.Jobdeliverd.next(del)
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
getcargoRecordwithStatus(status: string) {
  debugger
  const loginUser = localStorage.getItem('LoginUser')
  if (loginUser) {
    this.userLoginData = JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any;
    }) => {

      this.getuserrecord(element.id)

    });

  }
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
getUserBookingReacodByID(Id: any): void {
  this.coreservice.getUserBookingReacodByID(Id).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.userdata = response;
   console.log(this.userdata);
   

        localStorage.removeItem('userdata');
        localStorage.setItem('userdata', JSON.stringify(this.userdata))
 
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
  // this.cancelReason=reason
  debugger
  this.coreservice.getUserBookingReacodtocancel(id).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.canceljobs = response;
        console.log(this.canceljobs);
        this.JobCancel.next(response);
        const filteredData = this.removeExcludedFields(response, this.excludedFields);
        this.jobcanceled(filteredData)
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


// Function to remove excluded fields from an object
 removeExcludedFields(obj:any, excludedFields:any) {
  const newObj = { ...obj }; // Create a copy of the original object
  excludedFields.forEach((field: string | number) => {
    delete newObj[field]; // Delete the field from the copy
  });
  return newObj;
}

// Remove excluded fields from the response data


// Now filteredData contains only the relevant fields

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
  debugger
console.log(data);
 data.reason=this.cancelReason

  this.coreservice.createUserBookingcancelReacod(data).subscribe(data=>{
    console.log('canceljob',data);
})}


async getcurentcancelorder(id: any) {
  debugger
  try{
  const response=await this.coreservice.getUserBookingCanceldRecod(id).toPromise()
 
      if (response && Object.keys(response).length > 0) {
      
  this.show=true
        this.allCanceljobs = response;
      
   this.canceljobcount=response && Object.keys(response).length ;
   this.cancelJobCounts.next(this.canceljobcount)
  
 
 console.log("all cancel recod",this.allCanceljobs);
 

} else{
  this.show=false
}
    
    }catch(error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
     
    }
  
}



  async deletedrecod(Id: any){
    try{
 await this.coreservice.deletecancelRecord(Id).toPromise() 
      console.log('User record deleted successfully');
      // Handle success as needed
      alert('User cancel job successfully')
    }catch
    (error)  {
      console.error('Error deleting user record:', error);
      // Handle error as needed
    }
  }
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


  
  spinner(){
    setTimeout(() => {
      // Data loading complete
      this.loading = false;
    }, 2000);
    this.loading = true;
  
  }

}
