import { Component, OnInit } from '@angular/core';
import { AgencyAuthService } from '../../agencyAuthGard/agency-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  authstatus: any;
  userLoginData: any;

  constructor(public AuthService:AgencyAuthService) { }

  ngOnInit() {
    this.AuthService.authStatus$.subscribe(status => {
      this.authstatus = status;
    
    })
    const loginUser=localStorage.getItem('LoginAgency')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
  }
  }
}
