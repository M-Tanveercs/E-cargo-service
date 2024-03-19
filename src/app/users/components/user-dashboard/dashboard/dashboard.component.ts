import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any[]=[];
  userLoginData: any;
  username: any;
  orderSuccessful: boolean=false
  bookedJob: any;
  canceljobs: any;
  constructor(public commonservice:DashCommonService,private coreservice:CoreService, ) { }

  ngOnInit() {
    debugger
     const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
}) => {
      this.username=element.fullname
      this.getuserrecord(element.id)
    });
    console.log(this.username);
    
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
        } else {
        
          this.orderSuccessful = false;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
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
        alert('Error fetching data');
       
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

 
}
  
