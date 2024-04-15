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
  time = new Date();

  jobId: any;
  form!: FormGroup;
  userLoginData: any;
  cargoId: any;
  trackingid: any;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private commonservice:AgencyDashService) { }

  ngOnInit(): void {
    debugger
  
    this.form = this.fb.group({
      trackingId: [],
      cargoStatus: ['Pending', Validators.required],
      cargoLocation: ['', Validators.required],
      driverName: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      driverContact: ['', [Validators.required]],
      currentDate: ['', Validators.required],
      pickuptime: ['', Validators.required],
      deliveryProof: [''],
      reciverSignature: ['']
    });

    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
      this.commonservice.getmanageCargo(this.jobId)
    
    });
    this.commonservice.managecargodata.forEach((element: {
      trackingId: any;
      id: any; 
  }) => {
  
this.cargoId=element.id; 
this.trackingid=element.trackingId
alert(this.cargoId); 


    });
    if (this.trackingid===this.jobId) {
      const cargoData = this.commonservice.managecargodata[0]; // Get the first item from managecargodata
      this.form.patchValue({
        trackingId: cargoData.trackingId,
        cargoStatus: cargoData.cargoStatus,
        cargoLocation: cargoData.cargoLocation,
        driverName: cargoData.driverName,
        vehicleNumber: cargoData.vehicleNumber,
        driverContact: cargoData.driverContact,
        currentDate: cargoData.currentDate,
        pickuptime: cargoData.pickuptime,
        deliveryProof: cargoData.deliveryProof,
        reciverSignature: cargoData.reciverSignature
      });}
    // Find the specific job object
    const loginUser=localStorage.getItem('LoginAgency')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
  }) => {
  
      this.commonservice.getuserrecord(element.id)

    });
    
    }
    
  
     
  }
  onsubmit(): void {
    debugger
    if (this.form.valid) {
      this.form.patchValue({
        trackingId:this.jobId
      })
      const formData = this.form.value;
      if(this.commonservice.managecargodata.length > 0){
        
      
        this.commonservice.updateManageCartgo(this.cargoId,formData)
        alert('updateManageCartgo')
      }else{
        
        this.commonservice.managecargoTracking(formData)
        alert("manageCartgoTracking")
        console.log("managecargotracking");
       
        

      }
  
     
      const specificJob = this.commonservice.data.find((job: { id: any; }) => job.id === this.jobId);

if (specificJob) {
  // Update the status of the job
  // Assuming form is your FormGroup instance
const cargoStatusValue = this.form.get('cargoStatus')?.value;

  specificJob.status = cargoStatusValue

  
  this.commonservice.updateJobStatus(this.jobId,specificJob)
   
  this.commonservice.managecargodata=[]
} else {
  console.log('No job found with ID:', this.jobId);
}

      // Handle form submission, for example, send data to the server
      console.log(formData);
      alert("form submission")
    } else {
      // Mark all form controls as touched to display validation messages
      
    }

  }

}
