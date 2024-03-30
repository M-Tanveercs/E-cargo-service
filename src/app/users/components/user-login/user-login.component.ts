import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/userAuth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  @Input() buttonText: string = 'Submit';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;


  constructor(private fb: FormBuilder , private router: Router,private authservice:AuthService) {
      this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
    
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
  this.authservice.login(LoginEmail,LoginPassword)
      
  }
 
}
