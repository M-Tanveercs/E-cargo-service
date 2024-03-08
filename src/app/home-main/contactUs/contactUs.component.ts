import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      message: ['', Validators.required]
    });
  }
ngOnInit(): void {
    
}
  onSubmit() {
    // Handle form submission
    console.log(this.contactForm.value);
   this.contactForm.reset()
  }
  


}
