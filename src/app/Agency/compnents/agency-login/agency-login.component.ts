
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyAuthService } from '../../agencyAuthGard/agency-auth.service';
@Component({
  selector: 'app-agency-login',
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.css']
})
export class AgencyLoginComponent implements OnInit {

  @Input() buttonText: string = 'Submit';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;


  constructor(private fb: FormBuilder , private router: Router,private authservice: AgencyAuthService) {
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
