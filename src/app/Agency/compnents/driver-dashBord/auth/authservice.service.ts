import { Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  SignInFormData:any[]=[]
  SignUpFormData:any[]=[]
  //  isSignIn:boolean=false
  loginuserDetails:[]=[]
  password:any;
  loginemail: any;
  Athenticate:boolean=false

  private driverAuthStatus = new BehaviorSubject<boolean>(false);
  driverAuthStatus$ = this.driverAuthStatus.asObservable();
  data: any
constructor(private router:Router,    private route: ActivatedRoute, private coreservice:CoreService,private message:NzMessageService) {

 }
// isDriverAuthenticated():boolean{
//  const loginUserData= localStorage.getItem('LoginAgency')
// if(loginUserData  ){
// this.adminAuthStatus.next(true);

//   return true
// }else{
//   this.adminAuthStatus.next(false);
//   return false
// }
// }
isDriverAuthenticated(): boolean {
  const loginUserData = localStorage.getItem('LoginDriver');
  const isDriverAuthenticated = !!loginUserData; // Convert to boolean

  this.driverAuthStatus.next(isDriverAuthenticated); // Emit the new authentication status


  return isDriverAuthenticated;
}
updateDriverAuthStatus(isDriverAuthenticated: boolean): void {
  this.driverAuthStatus.next(isDriverAuthenticated);
}
async signupDriverRecord() {
  try{
 const response=await this.coreservice.getDriverRecord().toPromise()
   
      if (response && Object.keys(response).length > 0) {
      this.data = response;
      console.log(typeof response);
      }
    }catch
    (error) {
      console.error('Error fetching data:', error);
    }
  
}

// getsignupUserRecord() {
//   // Assuming users data is available and you want to send it to the server
//   this.coreservice.signupUserRecord().subscribe(data=>{
//     console.log(data);
    
    
//   })
// }

async login(loginemail:any,password:any) {
  this.loginemail = loginemail;
this.password = password;

// const storedSignUpData = localStorage.getItem('SignUp');

await this.signupDriverRecord();
    
if (this.data) {
   debugger
  const signUpData: [] = this.data

  const matchingUser = signUpData.find((user: any) => {
    
 const result=user.email === this.loginemail && user.driverPassword
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
    localStorage.setItem('LoginDriver','')
    localStorage.setItem('LoginDriver',JSON.stringify( this.loginuserDetails))
// this.toastr.success('You Login Successfully')
this.message.create('success','Login successfully')
    console.log('user Match');
    this.Athenticate=true
   
  
      this.router.navigate(['/driver-dashboard']); // Default redirect if no returnUrl is stored
    
    
  }else{
    
    this.Athenticate=false
//  this.toastr.error('Login Detailes not match')
    localStorage.setItem('LoginAdmin','')
    // this.isSignIn=false
    this.message.create('info','User Not Match')
    console.log('user not match');
    // alert('not match')
    // this.router.navigate(['/login'])
  }
 
}else{
  this.message.create('info','User Not Found Sign up First')
}
}
}
