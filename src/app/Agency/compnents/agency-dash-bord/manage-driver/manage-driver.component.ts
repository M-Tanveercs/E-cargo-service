import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-manage-driver',
  templateUrl: './manage-driver.component.html',
  styleUrls: ['./manage-driver.component.css']
})
export class ManageDriverComponent implements OnInit {
  selectedCartItem: any;
  form! : FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
  
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      cnic: ['', Validators.required],
      vehicleNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // drawer
  visible = false;
  size: 'large'  = 'large';

  get title(): string {
    return `Add New Driver`;
  }

 

  showLarge(item:any): void {
    this.selectedCartItem =item
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  
}
