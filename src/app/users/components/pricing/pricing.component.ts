

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  selectedPeriod: string = 'AM'; // 'AM' or 'PM'
  users: any;
  userId: any;
  totalVechialPrice: any;
  isSubmitDisabled:boolean=true
  bookingForm!: FormGroup;
  nextthreedays:any
  selectedDay: string | null = null;
  currentdate: any;
  pickUptime: any;
  time: any;
  constructor(private fb: FormBuilder ,private router:Router ,private coreService:CoreService) { 
    this.bookingForm = this.fb.group({
      pickupTime: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required,Validators.maxLength(11)]],
      receiverName: ['', Validators.required],
      receiverPhoneNumber: ['',[ Validators.required,Validators.maxLength(11)]],
      senderAddress: ['', Validators.required],
      receiverAddress: ['', Validators.required],
      itemDetails: ['', Validators.required],
      
    });
  
  }

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      console.log('pricing_usersData:',this.users);
      this.users.forEach((userData: {
        totalVechialPrice: any; userId: any; 
     
}) => {
        this.userId=userData.userId;
        this.totalVechialPrice=userData.totalVechialPrice
      
      });
      
    }
  
    if (this.users.length > 0) {
      const currentDate = new Date();
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = currentDate.getHours() > 12 ? (currentDate.getHours() - 12).toString().padStart(2, '0') : (currentDate.getHours()).toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const amPm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
 this.time = `${hours}:${minutes}:${seconds} ${amPm}`;
const currentDayName = dayNames[currentDate.getDay()];

// Get the date for the current day
const currentDateFormatted = currentDate.toLocaleDateString();
this.currentdate=currentDateFormatted
// Get the day names and dates for the next three days
const nextThreeDays = Array.from({ length: 3 }, (_, index) => {

const nextDay = new Date();
nextDay.setDate(currentDate.getDate() + index + 1); // Set the date to the next day
const nextDayName = dayNames[nextDay.getDay()];
const nextDayDateFormatted = nextDay.toLocaleDateString();
return { day: nextDayName, date: nextDayDateFormatted };
});

console.log('Current day:', currentDayName, currentDateFormatted);
console.log('Next three days:', nextThreeDays);
this.nextthreedays=nextThreeDays
      };
    
      this.coreService.getPickUpTimeRecord().subscribe(
        (response) => {
    
            this.pickUptime = response;
       console.log(this.pickUptime);
        },
       
      );
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
    console.log(this.selectedPeriod);
    
  }
  
  submitForm() {
    debugger
    if (this.bookingForm.valid) {
      const currentDate = new Date();

// const dateTimeObject = {
//   year: currentDate.getFullYear(),
//   month: currentDate.getMonth() + 1, // Month is zero-based, so add 1
//   day: currentDate.getDate(),
//   hours: currentDate.getHours(),
//   minutes: currentDate.getMinutes(),
//   seconds: currentDate.getSeconds(),
// };

// console.log(dateTimeObject);

      // Handle form submission logic here
      const formData = this.bookingForm.value;
  
      // Check if the users array is empty or not
      if (this.users.length > 0) {
        // const currentDate = new Date();
        // const year = currentDate.getFullYear();
        // const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // const month = monthNames[currentDate.getMonth()];
        // const day = currentDate.getDate().toString().padStart(2, '0');
        // const hours = currentDate.getHours() > 12 ? (currentDate.getHours() - 12).toString().padStart(2, '0') : (currentDate.getHours()).toString().padStart(2, '0');
        // const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        // const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        // const amPm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
      
        // const date = `${month}-${day}-${year}`;
        // const time = `${hours}:${minutes}:${seconds} ${amPm}`;
        
        const dateTimeObject = {
          date: this.selectedDay ? this.selectedDay : this.currentdate,
          JobBookedDate:this.currentdate,
          JobBookedTime:this.time,
         
        };
        
        // console.log(dateTimeObject);
      
        // Update the properties of the existing object
        const existingUserData = this.users[0];
        Object.assign(existingUserData, formData);
        Object.assign(existingUserData,dateTimeObject );
      } else {
        // If the users array is empty, push the form data as the first object
        this.users.push(formData);
      }
  
      console.log('pricingForm data', formData);
      console.log('userdata after push', this.users);
      localStorage.setItem('users','');
      localStorage.setItem('users', JSON.stringify(this.users));
       this.router.navigate(['/booking'])

    } else {
      // Handle invalid form
    }
  }
  
  selectDay(date: string) {
    this.selectedDay = date; 

    // Update the selected day
  }

  
}


