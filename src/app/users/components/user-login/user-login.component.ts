import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  @Input() buttonText: string = 'Submit';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;


  constructor(private fb: FormBuilder , private router: Router) {
      this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['']
      });
  }
ngOnInit(): void {
    
}
  onSubmit() {
      this.formSubmit.emit(this.form.value);
      console.log(this.form.value);
      
      
  }
 
}
