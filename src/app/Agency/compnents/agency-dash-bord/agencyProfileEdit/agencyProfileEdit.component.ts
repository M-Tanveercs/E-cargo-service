import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { Router } from '@angular/router';



import { AgencyAuthService } from '../../../agencyAuthGard/agency-auth.service';
import { AgencyDashService } from '../agency-dash.service';
@Component({
  selector: 'app-agencyProfileEdit',
  templateUrl: './agencyProfileEdit.component.html',
  styleUrls: ['./agencyProfileEdit.component.css']
})
export class AgencyProfileEditComponent implements OnInit {

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
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      businessName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      ntn: ['', Validators.required]
    });
    this.form2 = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', ],
      repeatNewPassword: ['', ]
    });
   }

  ngOnInit() {
    debugger
    const loginUser=localStorage.getItem('LoginAgency')
    if(loginUser){
      this.loginuser=JSON.parse(loginUser)
    this.loginuser.forEach((element: { id: any; }) => {
    this.userid=element.id
      this.dashcommonservice.getAgencySignUserData(element.id)
      this.signupuser=element
    });
      this.dashcommonservice.signUpUserData$.subscribe((data) =>{

console.log(this.signupuser);
this.form1.patchValue({
  fullName: this.signupuser.fullname,
  email: this.signupuser.email,
  phoneNumber : this.signupuser.mobile,
  address:this.signupuser.address,
  businessName:this.signupuser.businessName,
  ntn:this.signupuser.ntn

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
        address:this.form1.value.address,
        businessName:this.form1.value.businessName,
        ntn:this.form1.value.ntn
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
  localStorage.setItem('LoginAgency','')
  localStorage.setItem('LoginAgency', JSON.stringify(this.signup))
    this.coreService.updateAgencySignUp(postId, this.signup).subscribe(
      (response) => {
        console.log('Post updated successfully:', response);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
    this.userAuthService.Athenticate=false;
    alert('user logged out')
    localStorage.setItem('LoginAgency','')

    this.userAuthService.updateAuthStatus(false);
    alert('user logged out')
    this.router.navigate(['/agency-login']);
   
  }

}
