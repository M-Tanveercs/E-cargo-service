import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgencyDashService } from '../../agency-dash-bord/agency-dash.service';
import { DriverCommonService } from '../auth/common.service';

@Component({
  selector: 'app-cargoStatus',
  templateUrl: './cargoStatus.component.html',
  styleUrls: ['./cargoStatus.component.css']
})
export class CargoStatusComponent implements OnInit {

  time = new Date();

  jobId: any;
  form!: FormGroup;
  userLoginData: any;
  cargoId: any;
  trackingid: any;
  managecargodata:any[]=[]
  username: any;
  driverId: any;
  DriverContact: any;
  driverVehicleNo: any;
  agencyId: any
  imgDisplay: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private commonservice: DriverCommonService ) {
    this.form = this.fb.group({
      trackingId: [],
      cargoStatus: ['Pending', Validators.required],
      cargoLocation: [''],
      driverName: ['' ],
      vehicleNumber: ['' ],
      driverContact: [''],
      currentDate: [null ],
      pickuptime: [null ],
      deliveryProof: [null],
      reciverSignature: [null]
    });
  }

  ngOnInit(): void {
   debugger
    const loginUser=localStorage.getItem('LoginDriver')
  if(loginUser) {
  this.userLoginData=JSON.parse(loginUser)
  this.userLoginData.forEach((element: {
    vehicleNumber: any;
    phoneNumber: any;
    id: any; fullName: any; AgencyId:any
}) => {
    this.username=element.fullName
this.driverId=element.id
this.DriverContact=element.phoneNumber
this.driverVehicleNo=element.vehicleNumber
this.agencyId=element.AgencyId
    // this.commonservice.getuserrecord(element.id)
  });}
  this.form.patchValue({
    // currentDate: new Date().toLocaleDateString(),
    // pickuptime: new Date().toLocaleTimeString(),
    driverName:this.username,
    vehicleNumber:this.driverVehicleNo,
    driverContact:this.DriverContact
  })
  console.log(this.username);
    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
  
    });
 this.getcargodata()

  }
  async  getcargodata(){
    try {
      await this.commonservice.getmanageCargo(this.jobId)

      this.loadData(); // Call checkTracking after getmanageCargo
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    }

  async loadData() {
    try{
    const data = localStorage.getItem('managecargodata');
    if (data) {

      this.managecargodata = JSON.parse(data);
      this.managecargodata.forEach((element: {
        trackingId: any;
        id: any;
      }) => {

        this.cargoId = element.id;
        this.trackingid = element.trackingId
 
        alert(this.cargoId);


      });
  
    if (this.trackingid === this.jobId) {
      const cargoData = this.managecargodata[0]; // Get the first item from managecargodata
      this.form.patchValue({
        trackingId: cargoData.trackingId,
        cargoStatus: cargoData.cargoStatus,
        cargoLocation: cargoData.cargoLocation,
        // driverName: cargoData.driverName,
        // vehicleNumber: cargoData.vehicleNumber,
        // driverContact: cargoData.driverContact,
        currentDate: cargoData.currentDate,
        pickuptime: cargoData.pickuptime,
        deliveryProof: cargoData.deliveryProof,
        reciverSignature: cargoData.reciverSignature
      });
    }
  }else{
    alert('id not found')
  }
    // Find the specific job object
    this.commonservice.getuserrecord(this.agencyId)
    this.commonservice.getAssignDriverrecord(this.driverId)
  
    this.commonservice.getuserBookedRecord(this.jobId)
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}
reciverSignature(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
console.log( e.target.result);
this.reciverSignature=e.target.result
  };
  reader.readAsDataURL(file);
}
deliveryProof(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
console.log( e.target.result);
this.deliveryProof=e.target.result
  };
  reader.readAsDataURL(file);
}
  onsubmit(): void {
   
    if (this.form.valid) {
      const formData = this.form.value;
   
       formData.trackingId= this.jobId,
       formData.deliveryProof=this.deliveryProof,
       formData.reciverSignature=this.reciverSignature
    

      if (this.commonservice.managecargodata.length > 0) {


        this.commonservice.updateManageCartgo(this.cargoId, formData)
        alert('updateManageCartgo')
      } else {

        this.commonservice.managecargoTracking(formData)
        alert("manageCartgoTracking")
        console.log("managecargotracking");



      }


      const specificJob = this.commonservice.data.find((job: { jobid: any; }) => job.jobid === this.jobId);

      if (specificJob) {
        // Update the status of the job
        // Assuming form is your FormGroup instance
        const cargoStatusValue = this.form.get('cargoStatus')?.value;

        specificJob.status = cargoStatusValue


        this.commonservice.updateJobStatus( specificJob)

        this.commonservice.managecargodata = []
      } else {
        console.log('No job found with ID:', this.jobId);
      }

      const specficDriverRec=this.commonservice.DriverData.find((data:any) => data.driverId===this.driverId)
      if(specficDriverRec){
        const cargoStatusValue = this.form.get('cargoStatus')?.value;

        specficDriverRec.status = cargoStatusValue
        this.commonservice.updateJobStatusforDriver(specficDriverRec.id ,specficDriverRec)

        this.commonservice.managecargodata = []
debugger
const specficUserRec = this.commonservice.userData.find((data: any) => data.id === this.jobId);
if (specficUserRec) {
  const cargoStatusValue = this.form.get('cargoStatus')?.value;
  specficUserRec.status = cargoStatusValue;
  
          specficUserRec.status = cargoStatusValue
          this.commonservice.updateJobStatusforUser(specficUserRec)
  
        
      }}

      // Handle form submission, for example, send data to the server
      console.log(formData);
      alert("form submission")
    } else {
      // Mark all form controls as touched to display validation messages

    }

  }

  // map logic
  

}
