
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../adminAuthGard/admin-auth.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  
  @Input() buttonText: string = 'Submit';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;


  constructor(private fb: FormBuilder , private router: Router,private authService:AdminAuthService) {
      this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['']
      });
  }
ngOnInit(): void {
    
}
  onSubmit() {
    debugger
      this.formSubmit.emit(this.form.value);
      console.log(this.form.value);
   
      let LoginEmail=this.form.get('email')?.value
let LoginPassword=this.form.get('password')?.value
  console.log(LoginEmail,LoginPassword);
  this.authService.login(LoginEmail,LoginPassword)
      
  }
      
  
 

}
