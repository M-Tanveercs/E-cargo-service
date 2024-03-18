import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../userAuth.service';
import { Router } from '@angular/router';
import { UserCommonService } from '../../user-common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoginData: any
  username: any;

  constructor(public userAuthService:UserAuthService,private router:Router,public commonservice:UserCommonService) { }

  ngOnInit() {
  
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: { fullname: any; }) => {
      this.username=element.fullname
    });
    console.log(this.username);
    
    }
  }
  isNavHidden = false;

  toggleNav(): void {
    this.isNavHidden = !this.isNavHidden;
  }
  logout(){
    localStorage.setItem('LoginUser','')
    this.userAuthService.Athenticate=false;
    alert('user logged out')
    this.router.navigate(['']);
  }
}
