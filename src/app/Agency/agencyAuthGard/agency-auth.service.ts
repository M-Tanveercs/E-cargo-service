import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root'
})
export class AgencyAuthService {

  SignInFormData:any[]=[]
  SignUpFormData:any[]=[]
  //  isSignIn:boolean=false
  loginuserDetails:[]=[]
  password:any;
  loginemail: any;
  Athenticate:boolean=false

  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();
  data: any
constructor(private router:Router,    private route: ActivatedRoute, private coreservice:CoreService,private message:NzMessageService) {

 }
// isAuthenticated():boolean{
//  const loginUserData= localStorage.getItem('LoginAgency')
// if(loginUserData  ){
// this.authStatus.next(true);

//   return true
// }else{
//   this.authStatus.next(false);
//   return false
// }
// }
isAuthenticated(): boolean {
  const loginUserData = localStorage.getItem('LoginAgency');
  const isAuthenticated = !!loginUserData; // Convert to boolean

  this.authStatus.next(isAuthenticated); // Emit the new authentication status


  return isAuthenticated;
}
updateAuthStatus(isAuthenticated: boolean): void {
  this.authStatus.next(isAuthenticated);
}
async signupAgencyRecord() {
  try{
  const response =await this.coreservice.getsignupAgencyRecord().toPromise()
    
      this.data = response;
      console.log(typeof response);
      
  }catch(error)  {
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

await this.signupAgencyRecord();
    
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
    // Other login logic...
   
  }
  if (matchingUser) {
    this.loginuserDetails.splice(0)
    this.loginuserDetails.push(matchingUser)
    localStorage.setItem('LoginAgency','')
    localStorage.setItem('LoginAgency',JSON.stringify( this.loginuserDetails))
// this.toastr.success('You Login Successfully')

    console.log('user Match');
    this.message.create('success','Login successfully')
    this.Athenticate=true
   
  
      this.router.navigate(['/agency']); // Default redirect if no returnUrl is stored
    
    
  }else{
    
    this.Athenticate=false
//  this.toastr.error('Login Detailes not match')
    localStorage.setItem('LoginAgency','')
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
