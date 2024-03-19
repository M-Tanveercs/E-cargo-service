import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-cancelJobs',
  templateUrl: './cancelJobs.component.html',
  styleUrls: ['./cancelJobs.component.css']
})
export class CancelJobsComponent implements OnInit {
  userLoginData: any;
  allCanceljobs: any;

  constructor(private coreservice:CoreService) { }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginUser')
   if(loginUser) {
   this.userLoginData=JSON.parse(loginUser)
   this.userLoginData.forEach((element: {
     id: any; fullname: any; 
}) => {
   this.getcurentcancelorder(element.id)
   });
  
  }
   }
   getcurentcancelorder(id: any): void {
    debugger
    this.coreservice.getUserBookingCanceldRecod(id).subscribe(
      (response) => {
        if (response && Object.keys(response).length > 0) {
          this.allCanceljobs = response;
     
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
    );}}
