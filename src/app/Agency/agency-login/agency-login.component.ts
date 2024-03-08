
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agency-login',
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.css']
})
export class AgencyLoginComponent implements OnInit {

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
  signUp(){
    this.router.navigateByUrl('/agency-signup');
  }

}
