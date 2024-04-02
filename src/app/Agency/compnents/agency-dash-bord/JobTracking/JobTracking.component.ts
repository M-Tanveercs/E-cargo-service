import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AgencyDashService } from '../agency-dash.service';

@Component({
  selector: 'app-JobTracking',
  templateUrl: './JobTracking.component.html',
  styleUrls: ['./JobTracking.component.css']
})
export class JobTrackingComponent implements OnInit {

  jobId: any;
  form!: FormGroup;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private commonservice:AgencyDashService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
    });
    this.form = this.fb.group({
      trackingId: [{ value: this.jobId, disabled: true }],
      cargoStatus: ['Pending', Validators.required],
      cargoLocation: ['', Validators.required],
      driverName: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      driverContact: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      currentDate: ['', Validators.required],
      deliveryProof: ['']
    });
  }
  onsubmit(): void {
    debugger
    if (this.form.valid) {
      this.form.patchValue({
        trackingId:this.jobId
      })
      const formData = this.form.value;
      this.commonservice.managecargoTracking(formData)
      // Handle form submission, for example, send data to the server
      console.log(formData);
      alert("form submission")
    } else {
      // Mark all form controls as touched to display validation messages
      
    }
  }

}
