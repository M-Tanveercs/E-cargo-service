import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CoreService } from 'src/app/core/core.service';
interface DataItem {
  fullName: string;
  email: number;
  cnic: number;
  vehicleNumber: number;
  address: string;
  phoneNumber: string;
  id:any,
  driverPassword:any;
  status:any
}
@Component({
  selector: 'app-manage-driver',
  templateUrl: './manage-driver.component.html',
  styleUrls: ['./manage-driver.component.css']
})
export class ManageDriverComponent implements OnInit {
  selectedCartItem: any;
  form!: FormGroup;
  submitted = false;
  agencyid: any;
  driverDetail: any = [];
  drawertype:any
  driverId: any;
  passwordVisible = false;
  constructor(private fb: FormBuilder, private message: NzMessageService, private coreService: CoreService) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      cnic: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      vehicleNumber: ['', Validators.required],
      driverPassword: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    debugger
    const loginUser = localStorage.getItem('LoginAgency')
    if (loginUser) {
      const userLoginData = JSON.parse(loginUser)
      userLoginData.forEach((element: {
        id: any; fullname: any;
      }) => {
        this.agencyid = element.id

      });
    }
    this.getdriverDetail()
  }

  getdriverDetail() {
    this.coreService.GetDriverDetail(this.agencyid).subscribe(driverDetail => {
      this.driverDetail = driverDetail
      console.log(driverDetail);
      this.listOfData = this.driverDetail
      this.listOfDisplayData = [...this.listOfData];
    });
  }
  get f() { return this.form.controls; }
  submit(): void {
    this.submitted = true;
    debugger
    if (this.form.valid) {
      // Handle form1 submission logic here
      console.log(this.form.value);
      let formData = { AgencyId: this.agencyid,...this.form.value };
    
      this.coreService.AddnewDriver(formData).subscribe(
        data => {
          console.log(data);
          this.message.create('success', `New Driver Added successfully`);
          this.form.reset()
          this.visible = false;
          this.getdriverDetail()
          console.log('Form submitted successfully:', data);
        },
        error => {
          // Handle submission error
          console.error('Error submitting form:', error);
        }
      )

    } else {
      this.message.create('warning', `Fill Form Correctly`);

    }
  }
  addDriver(){
    this.drawertype='add';
    this.open()
  }
  // drawer
  visible = false;
  size: 'large' = 'large';

  get title(): string {
    if(this.drawertype==='add'){

      return `Add New Driver`;
    }else{
      return `Update Driver Details`;

    }
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
  // table

  searchValue = '';
  visibletable = false;

  listOfData: DataItem[] = this.driverDetail
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
   
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) =>
      item.fullName.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
  
  closeDropdown(){
this.visibletable=false
  }
  deleteDriver(id:any){
    debugger
    
this.coreService.DelDriverDetail(id).subscribe(driver =>{
  this.getdriverDetail()
  this.message.create('success', `Driver Deleted successfully`);
})
  }
 
  EditDriveDetail(id:any){
    debugger
    this.drawertype="edit"
    this.coreService.GetDriverDetailById(id).subscribe(data =>{
      const driverdata:any=[]
      driverdata.push(data)
      driverdata.forEach((element:any) => {
        this.form.patchValue({
          fullName:element.fullName,
          address:element.address,
          email:element.email,
          phoneNumber:element.phoneNumber,
          cnic:element.cnic,
          vehicleNumber:element.vehicleNumber,
          driverPassword:element.driverPassword,
          status:element.status
        })
        this.driverId=element.id
      });
    })
    this.open()


  }
  
  updateDriverDetail() {
    this.submitted = true;
    debugger
    if (this.form.valid) {
      // Handle form1 submission logic here
      console.log(this.form.value);
      let formData = { AgencyId: this.agencyid, ...this.form.value };
     
      this.coreService.updateDriverDetail(this.driverId,formData).subscribe(
        data => {
          console.log(data);
          this.message.create('success', `Driver Update successfully`);
          this.form.reset()
          this.visible = false;
          this.getdriverDetail()
          console.log('Form submitted successfully:', data);
        },
        error => {
          // Handle submission error
          console.error('Error submitting form:', error);
        }
      )

    } else {
      this.message.create('warning', `Fill Form Correctly`);

    }
  }
}
