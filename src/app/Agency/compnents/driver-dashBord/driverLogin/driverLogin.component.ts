import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { agencyAuthGuardGuard } from 'src/app/Agency/agencyAuthGard/agency-auth-guard.guard';
import { AgencyAuthService } from 'src/app/Agency/agencyAuthGard/agency-auth.service';

@Component({
  selector: 'app-driverLogin',
  templateUrl: './driverLogin.component.html',
  styleUrls: ['./driverLogin.component.css']
})
export class DriverLoginComponent implements OnInit {

  @Input() buttonText: string = 'Submit';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;


  constructor(private fb: FormBuilder , private router: Router,private authservice:AgencyAuthService) {
      this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          // confirmPassword: ['']
      });
  }
ngOnInit(): void {
    
}

  onSubmit() {
     debugger
      let LoginEmail=this.form.get('email')?.value
let LoginPassword=this.form.get('password')?.value
  console.log(LoginEmail,LoginPassword);
  this.authservice.login(LoginEmail,LoginPassword)
      
      
  }

}
