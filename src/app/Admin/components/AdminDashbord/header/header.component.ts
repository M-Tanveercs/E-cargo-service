import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/Admin/adminAuthGard/admin-auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  username: any;
  userLoginData: any;
  bookedcount: any;
  authstatus: any;

  constructor(private userAuthService:AdminAuthService, private router:Router,private message:NzMessageService ) { }

  ngOnInit() {
    debugger
    this.userAuthService.adminAuthStatus$.subscribe(status => {
      this.authstatus = status;

    
    })
    const loginUser=localStorage.getItem('LoginAdmin')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; name: any; 
}) => {
      this.username=element.name
     
    });
    console.log(this.username);


  }
  // const job=localStorage.getItem('bookedJob')
  // if(job){
  //   this.bookedcount=JSON.parse(job)
  // }
  // this.commonservice.jobAcceptcountData$.subscribe((data) => {
  //   this.bookedcount = data;

  // });
}
  logout(){
    debugger
    localStorage.setItem('LoginAdmin','')
    this.userAuthService.updateadminAuthStatus(false);
    // Set authentication status to false
    // Remove authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    this.message.create('info','Logout Successfully')
    this.router.navigate(['admin-login']);
  }
}
