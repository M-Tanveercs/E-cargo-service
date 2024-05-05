import { Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../core/core.service';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SignInFormData:any[]=[]
  SignUpFormData:any[]=[]
  //  isSignIn:boolean=false
  loginuserDetails:[]=[]
  password:any;
  loginemail: any;
  Athenticate:boolean=false
  returnUrl: string;
  data: any

    public authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();
constructor(private router:Router,    private route: ActivatedRoute, private coreservice:CoreService,private message:NzMessageService) {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated) {
    this.authStatus.next(JSON.parse(isAuthenticated));
  }
 }
isAuthenticated():boolean{
 const loginUserData= localStorage.getItem('LoginUser')
if(loginUserData  ){


  return true
}else{

  return false
}
}
async getsignupUserRecord(){
  try{
  const response= await this.coreservice.getsignupUserRecord().toPromise()
   
      this.data = response;
      console.log(typeof response);
      
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
updateAuthStatus(isAuthenticated: boolean): void {
  this.authStatus.next(isAuthenticated);
}
async login(loginemail:any,password:any) {
  this.loginemail = loginemail;
this.password = password;

// const storedSignUpData = localStorage.getItem('SignUp');

await this.getsignupUserRecord();
    
if (this.data) {
   debugger
  const signUpData: [] = this.data

  const matchingUser = signUpData.find((user: any) => {
    
 const result=user.email === this.loginemail && user.password
 === this.password;
    return result
    
  });
  console.log(matchingUser);
 
  if (matchingUser) {
    this.loginuserDetails.splice(0)
    this.loginuserDetails.push(matchingUser)
    localStorage.setItem('LoginUser','')
    localStorage.setItem('LoginUser',JSON.stringify( this.loginuserDetails))
// this.toastr.success('You Login Successfully')

this.authStatus.next(true); // Set authentication status to true
    // Save authentication status to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    console.log('user Match');
    // alert(' login successfully')
    this.message.create('success','Login successfully')
   
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      // Clear the stored returnUrl
      localStorage.setItem('returnUrl','');
      this.router.navigateByUrl(returnUrl);
    } else {
      this.router.navigate(['/']); // Default redirect if no returnUrl is stored
    }
    
  }else{
    
    this.message.create('info','User Not Match')
    localStorage.setItem('LoginUser','')
   
  }
 
}else{
  this.message.create('info','user account not found sign up first')

}
}

}
