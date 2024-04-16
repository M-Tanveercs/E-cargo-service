import { Injectable } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  SignInFormData:any[]=[]
  SignUpFormData:any[]=[]
  //  isSignIn:boolean=false
  loginuserDetails:[]=[]
  password:any;
  loginemail: any;
  Athenticate:boolean=false

  private adminAuthStatus = new BehaviorSubject<boolean>(false);
  adminAuthStatus$ = this.adminAuthStatus.asObservable();
  data: any
constructor(private router:Router,    private route: ActivatedRoute, private coreservice:CoreService) {

 }
// isAuthenticated():boolean{
//  const loginUserData= localStorage.getItem('LoginAgency')
// if(loginUserData  ){
// this.adminAuthStatus.next(true);

//   return true
// }else{
//   this.adminAuthStatus.next(false);
//   return false
// }
// }
isAuthenticated(): boolean {
  const loginUserData = localStorage.getItem('LoginAdmin');
  const isAuthenticated = !!loginUserData; // Convert to boolean

  this.adminAuthStatus.next(isAuthenticated); // Emit the new authentication status


  return isAuthenticated;
}
updateadminAuthStatus(isAuthenticated: boolean): void {
  this.adminAuthStatus.next(isAuthenticated);
}
signupAdminRecord(): void {
  this.coreservice.getAdminRecord().subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
      this.data = response;
      console.log(typeof response);
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

// getsignupUserRecord() {
//   // Assuming users data is available and you want to send it to the server
//   this.coreservice.signupUserRecord().subscribe(data=>{
//     console.log(data);
    
    
//   })
// }

login(loginemail:any,password:any) {
  this.loginemail = loginemail;
this.password = password;

// const storedSignUpData = localStorage.getItem('SignUp');

this.signupAdminRecord();
    
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
    localStorage.setItem('LoginAdmin','')
    localStorage.setItem('LoginAdmin',JSON.stringify( this.loginuserDetails))
// this.toastr.success('You Login Successfully')

    console.log('user Match');
    alert(' login successfully')
    this.Athenticate=true
   
  
      this.router.navigate(['/admin-dashbord']); // Default redirect if no returnUrl is stored
    
    
  }else{
    
    this.Athenticate=false
//  this.toastr.error('Login Detailes not match')
    localStorage.setItem('LoginAdmin','')
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
