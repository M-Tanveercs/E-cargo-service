import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { AgencyDashService } from '../agency-dash.service';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-AgencyDashBord',
  templateUrl: './AgencyDashBord.component.html',
  styleUrls: ['./AgencyDashBord.component.css']
})
export class AgencyDashBordComponent implements OnInit {
  username: any;
  userLoginData: any;
  jobcount: any;
  selectedCartItem: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;
  singleValue: any;
  drivers: any[] = []
  driverForm: FormGroup;
  driverjobid: any;
  driverJobIds: any[] = []
  jobId: any;
  agencyId: any;
  assignType: any;
  existingDriverId: any;

  constructor(public commonservice: AgencyDashService, private coreservice: CoreService, private fb: FormBuilder, private message: NzMessageService) {
    this.driverForm = this.fb.group({
      // Require selection of goods type

      selectedDriver: ['', Validators.required] // Optional selection of helper
    });
  }
  ngOnInit() {
    // debugger
    const loginUser = localStorage.getItem('LoginAgency')
    if (loginUser) {
      this.userLoginData = JSON.parse(loginUser)
      this.userLoginData.forEach((element: {
        id: any; fullname: any;
      }) => {
        this.agencyId=element.id
        this.username = element.fullname

        this.commonservice.getuserrecord(element.id)
      });
      console.log(this.username);

    }
    this.commonservice.jobAcceptcountData$.subscribe(data => {
      this.jobcount = data
    })
    this.commonservice.jobProcessingcount$.subscribe(data => {
      this.jobproc = data
    })
    this.commonservice.jobonthewaycount$.subscribe(data => {
      this.jobontheway = data
    })
    this.commonservice.jobDeliverCount$.subscribe(data => {
      this.jobdelv = data
    })
    // this.commonservice.data.forEach((data) => {
    //   this.jobId.push(data.id)
    // })
    this.getOrderToDriver()

    this.getAllDriverData()

    console.log('all data', this.commonservice.data);


  }
  getAllDriverData() {
    this.coreservice.getDriverRecord().subscribe(driverRecord => {
      // this.drivers = driverRecord

      this.drivers = driverRecord.filter((driver: any) => {
          return driver.status === 'free';
      });
      console.log(driverRecord);
      console.log('status free driver', this.drivers);


    });
  }


  // drawer
  visible = false;
  size: 'large' = 'large';

  get title(): string {
    return `Job Details`;
  }



  showLarge(item: any): void {
    this.selectedCartItem = item
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  //modal
  isVisible = false;

  showModal(jobid:any,type:any): void {
    this.isVisible = true;
this.jobId=jobid
this.assignType=type

  }

  handleOk(): void {
    debugger
    if (this.driverForm.valid) {
        const driverId=this.driverForm.value.selectedDriver
      const data =  this.coreservice.GetDriverDetailById(driverId).subscribe(driver => {

      })
      const getDriverName = this.drivers.find(a => a.id == driverId);
      console.log('Button ok clicked!');
      this.isVisible = false;
      this.getOrderAcceptRecord(this.jobId,getDriverName);
     
      console.log(driverId);
      console.log("job Id", this.jobId);
      this.commonservice.getuserrecord(this.agencyId)
    } else {
      this.message.create('error', 'Please select driver');
    }


  }
  generateRandomId(): string {
    const min = 1000; // Minimum 4-digit number (1000)
    const max = 9999; // Maximum 4-digit number (9999)
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId.toString(); // Convert to string
  }

  // Example usage
  // Output a random 4-digit ID

  async getOrderAcceptRecord(id: any,drivername:any) {
    debugger
    try {
      const jobdataArray = await this.coreservice.getOrderAcceptRecordByIdonly(id).toPromise();

      if(this.assignType=='assign'){
        if (jobdataArray.length > 0) {
          // Access the first element of the array
          const data = jobdataArray[0];
      const randomId = this.generateRandomId();
      data.driverId = this.driverForm.value.selectedDriver;
      data.jobid = id
      data.id = randomId
      data.driverName = drivername.fullName
      // let newObj = Object.fromEntries(
      //   Object.entries(data).filter(([key, value]) => value !== data.id)
      // )
      console.log('newobj', data);
        
      await this.coreservice.OrderAssignToDriver(data).toPromise()
        .then((response) => {
          if (response) {
            this.updateDriverSatus( data.driverId, this.jobId)
            this.message.create('success', 'Driver Assigned Successfully');
          } else {
            this.message.create('error', 'Something went wrong');
          }
        })
        .catch((error) => {
          this.handleError(error); // Handle the error
        });
      }
      }else if(this.assignType=='reAssign'){
      // Fetch jobdata asynchronously
const jobdataArray = await this.coreservice.getOrderAssignToDriverByJobId(id).toPromise();

// Ensure that jobdataArray is not empty and contains at least one element
if (jobdataArray.length > 0) {
  // Access the first element of the array
  const jobdata = jobdataArray[0];
this.existingDriverId=jobdata.driverId
  // Add new properties driverId and driverName
  jobdata.driverId = this.driverForm.value.selectedDriver;
  jobdata.driverName = drivername.fullName;
  await this.coreservice.OrderReAssignToDriver(jobdata.id,jobdata).toPromise()
  .then((response) => {
    if (response) {
      this.updateDriverSatus( jobdata.driverId, this.jobId)
      this.message.create('success', 'Driver Assigned Successfully');
    } else {
      this.message.create('error', 'Something went wrong');
    }
  })
  // Use the updated jobdata object
  console.log(jobdata);
} else {
  console.error('jobdataArray is empty');

}
    
      }
    } catch (error) {
      this.handleError(error); // Handle the error
    }
    
  }

  private handleError(error: any): void {
    let errorMessage = 'An error occurred';
    if (error.status) {
      // Server error
      errorMessage = `Server Error: ${error.status}`;
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Other types of errors
      errorMessage = `Unknown Error: ${error.message}`;
    }
    this.message.create('error', errorMessage);
  }

  async updateDriverSatus(id: any, jobid: any) {
    debugger
    try {
      // Get the driver's current details
      
      // Check if the driver is currently "free"
      if (this.assignType=='assign') {
        const data = await this.coreservice.GetDriverDetailById(id).toPromise();
        // Prepare the updated data with the new status
        const updatedData = { ...data, status: 'booked'};

        // Update the driver's details with the new status
        await this.coreservice.updateDriverDetail(id, updatedData).toPromise();


        // Display a success message
        this.message.create('success', 'Driver status updated successfully');
        this.getAllDriverData()
        this.commonservice.getuserrecord(this.agencyId)

      } 
      if(this.assignType=='reAssign') {
        const extdata = await this.coreservice.GetDriverDetailById(this.existingDriverId).toPromise();
        const updatedData = { ...extdata, status: 'free'};

        // Update the driver's details with the new status
        await this.coreservice.updateDriverDetail(this.existingDriverId, updatedData).toPromise();

        
          const data = await this.coreservice.GetDriverDetailById(id).toPromise();
          // Prepare the updated data with the new status
          const Data = { ...data, status: 'booked'};
  
          // Update the driver's details with the new status
          await this.coreservice.updateDriverDetail(id, Data).toPromise();

        // Display a success message
        this.message.create('success', 'Driver status updated successfully');
        this.getAllDriverData()
        this.commonservice.getuserrecord(this.agencyId)
        // Display a message indicating that the driver is already booked
       
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error updating driver status:', error);
      this.message.create('error', 'An error occurred while updating driver status');
    }




  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  async getOrderToDriver() {
    // Get driver details
    const driverDetails = await this.coreservice.getOrderAssignToDriver().toPromise();

    // Extract job IDs from driver details
    this.driverJobIds = driverDetails.map((driver: { jobid: any; }) => driver.jobid);
    console.log('driverjobids', this.driverJobIds);

    // Iterate over your carts


  }
  // async drivername(id: any): Promise<any> {
  //   if (!id) {
  //     return ''; // Return empty string if id is falsy
  //   }
  //   const data = await this.driverN(id);
  //   console.log(data.driverId); // Assuming data contains the driver details

  //   // Check if data is valid and contains driverId
  //   if (data && data.driverId) {
  //     return data.driverId; // Return the driverId
  //   } else {
  //     console.error("Invalid data or missing driverId:", data);
  //     return null; // Return null or handle the error as appropriate
  //   }
  // }

  // async driverN(id: any): Promise<any> {
  //   try {
  //     const data = await this.coreservice.getOrderAssignToDriverByid(id).toPromise();
  //     return data; // Assuming getOrderAssignToDriverByid returns an object containing driver details
  //   } catch (error) {
  //     console.error("Error fetching driver details:", error);
  //     return null;
  //   }
  // }


}
