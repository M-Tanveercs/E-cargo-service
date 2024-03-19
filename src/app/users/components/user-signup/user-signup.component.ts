import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
buttonStatus:boolean=true
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private coreservice:CoreService) {
    debugger
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    
    });
   
  }
 

  
  ngOnInit() {

  }

  // Getter function to easily access form controls
  get f() { return this.signupForm.controls; }

  onSubmit() {
    debugger;
    // Check if the form is valid
    if (this.signupForm.valid) {
      
  this.buttonStatus=false
      // Retrieve existing data from local storage
      const storedSignUpData = localStorage.getItem('SignUp');
   
      if(storedSignUpData){
        const existingSignUpData: any[] = storedSignUpData ? JSON.parse(storedSignUpData) : [];
        const emailExists = existingSignUpData.some(user => user.email === this.signupForm.value.email);
    
        if (emailExists) {
          // Display an error message or take appropriate action
          alert('Email already exists. Please use a different email.');
          return; // Stop further execution
        }
        const uniqueId = this.generateUniqueId();
    
        // Push the new user data with the unique ID to the existing array
        const newUser = { id: uniqueId, ...this.signupForm.value };
        existingSignUpData.push(newUser);
      this.signupRecord(newUser)
           // Store the updated data back to local storage
      localStorage.setItem('SignUp', JSON.stringify(existingSignUpData));
    
      console.log(existingSignUpData);
      this.signupForm.reset();
      }else{
        const uniqueId = this.generateUniqueId();
        const newUser = { id: uniqueId,...this.signupForm.value };
        const existingSignUpData: any[] = [];
        existingSignUpData.push(newUser);
        localStorage.setItem('SignUp', JSON.stringify(existingSignUpData));
        console.log(existingSignUpData);
        this.signupForm.reset();
      }
  
    
      // Generate a unique ID for the new user
     
   
      alert('signup successfully')
      this.router.navigate(['/user-login'])
    }

this.buttonStatus=false

    // Form is valid, continue with form submission logic
    // ...
  }
 
 
  generateUniqueId() {
    // This is a simple example; you may want to use a more robust method
    // to generate unique IDs in a real-world application
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  signupRecord(userData: any) {
    // Assuming users data is available and you want to send it to the server
    this.coreservice.signupUserRecord(userData).subscribe(data=>{
      console.log(data);
      
      
    })
  }

}
