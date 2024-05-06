import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-agency-signup',
  templateUrl: './agency-signup.component.html',
  styleUrls: ['./agency-signup.component.css']
})
export class AgencySignupComponent implements OnInit {
  signupForm!: FormGroup;
  cnicfrontImg: any|'';
  cnicbackImg: any|'';

  constructor(private fb: FormBuilder, private router: Router,private coreservice:CoreService,private message:NzMessageService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      businessName: ['', Validators.required],
      ntn: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Getter function to easily access form controls
  get f() { return this.signupForm.controls; }

//   onSubmit() {
//     // Check if the form is valid
//     if (this.signupForm.invalid) {
//       return;
//     }
// console.log(this.signupForm.value);

//     // Form is valid, continue with form submission logic
//     // ...
//   }
cnicFrontImage(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
console.log( e.target.result);
this.cnicfrontImg=e.target.result
  };
  reader.readAsDataURL(file);
}
cnicBackImage(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
console.log( e.target.result);
this.cnicbackImg=e.target.result
  };
  reader.readAsDataURL(file);
}
  onSubmit() {
    debugger;
    // Check if the form is valid
    if (this.signupForm.valid) {
      
  // this.buttonStatus=false
      // Retrieve existing data from local storage
      const storedSignUpData = localStorage.getItem('AgencySignUp');
   
      if(storedSignUpData){
        const existingSignUpData: any[] = storedSignUpData ? JSON.parse(storedSignUpData) : [];
        const emailExists = existingSignUpData.some(user => user.email === this.signupForm.value.email);
    
        if (emailExists) {
          // Display an error message or take appropriate action
          this.message.create('danger','Email already exists. Please use a different email.')
          
          return; // Stop further execution
        }
        // const uniqueId = this.generateUniqueId();


        // Push the new user data with the unique ID to the existing array
      
   
      }else{
    
          const newUser = {
            cnicFrontImg: this.cnicfrontImg,
            cnicBackImg: this.cnicbackImg,
            ...this.signupForm.value,
          };
         
          this.AgencySignupRecord(newUser);
        const existingSignUpData: any[] = [];
        existingSignUpData.push(newUser);
        localStorage.setItem('AgencySignUp', JSON.stringify(existingSignUpData));
        console.log(existingSignUpData);
        this.signupForm.reset();
      }
  
    
      // Generate a unique ID for the new user
     
      this.message.create('info','SignUp Successfully')
      this.router.navigate(['/agency-login'])
    }

// this.buttonStatus=false

    // Form is valid, continue with form submission logic
    // ...
  }

  AgencySignupRecord(userData: any) {
    // Assuming users data is available and you want to send it to the server
    this.coreservice.signupAgencyRecord(userData).subscribe(data=>{
      console.log(data);
      
      
    })
  }

}
