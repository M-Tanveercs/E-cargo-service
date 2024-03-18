import { Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  SignInFormData:any[]=[]
  SignUpFormData:any[]=[]
  //  isSignIn:boolean=false
  loginuserDetails:[]=[]
  password:any;
  loginemail: any;
  Athenticate:boolean=false
  returnUrl: string;

constructor(private router:Router,    private route: ActivatedRoute,) {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
 }
isAuthenticated():boolean{
 const loginUserData= localStorage.getItem('LoginUser')
if(loginUserData  ){


  return true
}else{

  return false
}
}

login(loginemail:any,password:any) {
  this.loginemail = loginemail;
this.password = password;

const storedSignUpData = localStorage.getItem('SignUp');
    
    
if (storedSignUpData) {
   debugger
  const signUpData: [] = JSON.parse(storedSignUpData);

  const matchingUser = signUpData.find((user: any) => {
    
 const result=user.email === this.loginemail && user.password
 === this.password;
    return result
    
  });
  console.log(matchingUser);
  if (matchingUser) {
    // Other login logic...
   
  }
  if (matchingUser) {
    this.loginuserDetails.splice(0)
    this.loginuserDetails.push(matchingUser)
    localStorage.setItem('LoginUser','')
    localStorage.setItem('LoginUser',JSON.stringify( this.loginuserDetails))
// this.toastr.success('You Login Successfully')

    console.log('user Match');
    alert(' login successfully')
    this.Athenticate=true
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      // Clear the stored returnUrl
      localStorage.setItem('returnUrl','');
      this.router.navigateByUrl(returnUrl);
    } else {
      this.router.navigate(['/']); // Default redirect if no returnUrl is stored
    }
    
  }else{
    
    this.Athenticate=false
//  this.toastr.error('Login Detailes not match')
    localStorage.setItem('LoginUser','')
    // this.isSignIn=false
    alert('user not match')
    console.log('user not match');
    // alert('not match')
    // this.router.navigate(['/login'])
  }
 
}else{
  alert('user account not found sign up first')
}
}

}
