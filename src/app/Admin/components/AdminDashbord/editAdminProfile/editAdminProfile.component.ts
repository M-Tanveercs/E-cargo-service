import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { Router } from '@angular/router';
import { AgencyDashService } from 'src/app/Agency/compnents/agency-dash-bord/agency-dash.service';
import { AgencyAuthService } from 'src/app/Agency/agencyAuthGard/agency-auth.service';
import { BehaviorSubject } from 'rxjs';




@Component({
  selector: 'app-editAdminProfile',
  templateUrl: './editAdminProfile.component.html',
  styleUrls: ['./editAdminProfile.component.css']
})
export class EditAdminProfileComponent implements OnInit {
  private SignupUser = new BehaviorSubject({});
  signUpUserData$ = this.SignupUser.asObservable();
  loginuser: any;
  userid: any;
  signupuserdata: any;
  signupuser: any;
  form1 !: FormGroup;
  form2 !: FormGroup;
  signup:any
  passwords: any
  constructor(public dashcommonservice:AgencyDashService,private fb: FormBuilder,private coreService:CoreService,private userAuthService:AgencyAuthService, private router:Router) {
    this.form1 = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.form2 = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', ],
      repeatNewPassword: ['', ]
    });
   }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginAdmin')
    if(loginUser){
      this.loginuser=JSON.parse(loginUser)
    this.loginuser.forEach((element: { _id: any; }) => {
    this.userid=element._id
      this.coreService.getAdminRecordByID(element._id)
      this.signupuser=element
    });
      this.signUpUserData$.subscribe((data) =>{

console.log(this.signupuser);
this.form1.patchValue({
  name: this.signupuser.name,
  email: this.signupuser.email,
  

});
console.log(this.form1.value);

this.form2.patchValue({

  currentPassword:this.signupuser.password,


});
      })
      
   
    }
   
    
  }
  submitForm1(): void {
    debugger
    if (this.form1.valid) {
      // Handle form1 submission logic here
      console.log(this.form1.value);
      
      this.signup={
        _id:this.userid,
        name:this.form1.value.name,
        email:this.form1.value.email,
      }
      this.submitForm2()
    } else {
      // Mark all fields as touched to trigger validation messages
      this.form1.markAllAsTouched();
    }
  }
  submitForm2(): void {
    debugger
    if (this.form2.valid) {
      // Handle form2 submission logic here
      console.log(this.form2.value);
      this.passwords={
        password:this.form2.value.newPassword?this.form2.value.newPassword:this.form2.value.currentPassword,
        confirmPassword:this.form2.value.newPassword?this.form2.value.newPassword:this.form2.value.currentPassword
      }
      Object.assign(this.signup, this.passwords);
      console.log('full sign up form',this.signup);
      this.updatePost()
        
    } else {
      // Mark all fields as touched to trigger validation messages
      this.form2.markAllAsTouched();
    }
  }
  updatePost() {
    debugger
    const postId = this.userid; // Example post ID
  localStorage.setItem('LoginAdmin','')
  localStorage.setItem('LoginAdmin', JSON.stringify(this.signup))
    this.coreService.updateAdminRecordByID(postId, this.signup).subscribe(
      (response) => {
        console.log('Post updated successfully:', response);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
    this.userAuthService.Athenticate=false;
    alert('user logged out')
    localStorage.setItem('LoginAdmin','')

    this.userAuthService.updateAuthStatus(false);
    alert('user logged out')
    this.router.navigate(['/admin-login']);
   
  }

}
