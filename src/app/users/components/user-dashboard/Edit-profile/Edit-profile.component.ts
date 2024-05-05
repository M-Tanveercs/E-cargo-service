import { Component, OnInit } from '@angular/core';
import { DashCommonService } from '../dash-common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/userAuth.service';

@Component({
  selector: 'app-Edit-profile',
  templateUrl: './Edit-profile.component.html',
  styleUrls: ['./Edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  loginuser: any;
  userid: any;
  signupuserdata: any;
  signupuser: any;
  form1 !: FormGroup;
  form2 !: FormGroup;
  signup:any
  passwords: any
  constructor(public dashcommonservice:DashCommonService,private fb: FormBuilder,private coreService:CoreService,public userAuthService:AuthService, private router:Router) {
    this.form1 = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    this.form2 = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['' ],
      repeatNewPassword: ['']
    });
   }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser){
      this.loginuser=JSON.parse(loginUser)
    this.loginuser.forEach((element: { _id: any; }) => {
    this.userid=element._id
      this.dashcommonservice.getSignUserData(element._id)
      this.signupuser=element
    });
      this.dashcommonservice.signUpUserData$.subscribe((data) =>{

console.log(this.signupuser);
this.form1.patchValue({
  fullName: this.signupuser.fullname,
  email: this.signupuser.email,
  phoneNumber : this.signupuser.mobile,
  address:this.signupuser.address

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
        id:this.userid,
        fullname:this.form1.value.fullName,
        email:this.form1.value.email,
        mobile:this.form1.value.phoneNumber,
        address:this.form1.value.address
      }
   this.submitForm2()
    } else {
      // Mark all fields as touched to trigger validation messages
      this.form1.markAllAsTouched();
    }
  }
  submitForm2(): void {
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
  localStorage.setItem('LoginUser','')
  localStorage.setItem('LoginUser', JSON.stringify(this.signup))
    this.coreService.updateSignUp(postId, this.signup).subscribe(
      (response) => {
        console.log('Post updated successfully:', response);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
    alert('user logged out')
    this.router.navigate(['/']);
    this.userAuthService.authStatus.next(false);
  }

}
