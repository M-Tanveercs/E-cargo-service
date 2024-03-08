import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Getter function to easily access form controls
  get f() { return this.signupForm.controls; }

  onSubmit() {
    // Check if the form is valid
    if (this.signupForm.invalid) {
      return;
    }
console.log(this.signupForm.value);

    // Form is valid, continue with form submission logic
    // ...
  }

  login() {
    this.router.navigateByUrl('user/user-login');
  }
}
