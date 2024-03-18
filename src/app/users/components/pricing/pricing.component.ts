

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder ,private router:Router) { 
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
  

  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
    console.log(this.selectedPeriod);
    
  }
  
  submitForm() {
    debugger
    if (this.bookingForm.valid) {
      const currentDate = new Date();

const dateTimeObject = {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth() + 1, // Month is zero-based, so add 1
  day: currentDate.getDate(),
  hours: currentDate.getHours(),
  minutes: currentDate.getMinutes(),
  seconds: currentDate.getSeconds(),
};

console.log(dateTimeObject);

      // Handle form submission logic here
      const formData = this.bookingForm.value;
  
      // Check if the users array is empty or not
      if (this.users.length > 0) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours() > 12 ? (currentDate.getHours() - 12).toString().padStart(2, '0') : (currentDate.getHours()).toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const amPm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
      
        const date = `${month}-${day}-${year}`;
        const time = `${hours}:${minutes}:${seconds} ${amPm}`;
        
        const dateTimeObject = {
          date: date,
          time: time
        };
      
        console.log(dateTimeObject);
      
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
  


  
}


