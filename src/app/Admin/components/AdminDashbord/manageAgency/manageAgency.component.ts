import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';
import { CoreService } from 'src/app/core/core.service';
interface DataItem {
  fullname: string;
  email: number;
  address: string;
  mobile: string;
  _id:any,
  password:any;
  businessName:string
  ntn:number
}
@Component({
  selector: 'app-manageAgency',
  templateUrl: './manageAgency.component.html',
  styleUrls: ['./manageAgency.component.css']
})
export class ManageAgencyComponent implements OnInit {
  selectedCartItem: any;
  form!: FormGroup;
  submitted = false;
  drawertype:any
  passwordVisible = false;
  AgencyData: any[]=[];
  userId: any;
  AgencyId: any;
  cnicfrontImg: any;
  src: any;
  text: any;
  cnicBackImg: any;
  constructor(private fb: FormBuilder, private message: NzMessageService, private coreService: CoreService,public commonservice:AdminCommonService) {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      businessName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      ntn: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
   this.getAllRequireData()
  }
  async getAllRequireData(){
    debugger
   await this.commonservice.getAllRegisteredAgency()
   this.AgencyData=this.commonservice.allRegiteredAgency
   this.listOfData = this.AgencyData
   this.listOfDisplayData = [...this.listOfData];
  }


  
 
  get f() { return this.form.controls; }
  submit(): void {
    this.submitted = true;
    debugger
    if (this.form.valid) {
      // Handle form1 submission logic here
      console.log(this.form.value);
      let formData = this.form.value
    
      this.coreService.signupAgencyRecord(formData).subscribe(
        data => {
          console.log(data);
          this.message.create('success', `New Agency Added successfully`);
          this.form.reset()
          this.visible = false;
          this.getAllRequireData()
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
  addNewUser(){
    this.drawertype='add';
    this.open()
  }
  // drawer
  visible = false;
  size: 'large' = 'large';

  get title(): string {
    if(this.drawertype==='add'){

      return `Add New User`;
    }else{
      return `Update User Details`;

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
    this.form.reset()
  }
  // table

  searchValue = '';
  visibletable = false;

  listOfData: DataItem[] = this.AgencyData
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
   
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) =>
      item.fullname.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
  
  closeDropdown(){
this.visibletable=false
  }
  deleteAgency(id:any){
    debugger
    
this.coreService.delsignupAgencyRecordById(id).subscribe(user =>{
  this.getAllRequireData()
    this.message.create('success', `Agency Deleted successfully`);
})
  }
 
  EditAgencyDetail(id:any){
    debugger
    this.drawertype="edit"
    
      let AgencyData
     AgencyData=this.AgencyData.filter(user => user._id==id)
      AgencyData.forEach((element:any) => {
        this.form.patchValue({
          fullname:element.fullname,
          address:element.address,
          email:element.email,
          mobile:element.mobile,
          password:element.password,
          businessName:element.businessName,
          ntn:element.ntn,
        })
        this.AgencyId=element._id
      });
    
    this.open()


  }
  
  updateAgencyDetail() {
    this.submitted = true;
    debugger
    if (this.form.valid) {
      // Handle form1 submission logic here
      console.log(this.form.value);
      let formData = this.form.value 
     
      this.coreService.updateAgencySignUp(this.AgencyId,formData).subscribe(
        data => {
          console.log(data);
          this.message.create('success', `Agency Update successfully`);
          this.form.reset()
          this.visible = false;
          this.getAllRequireData()
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
  show: boolean = false;
  onClick(imageType: string,id:any): void {
    debugger;
   const filterdata= this.AgencyData.find((data:any)=>
data._id === id)
  
    if (imageType === 'front') {
    this.cnicfrontImg=filterdata.cnicFrontImg
      if (filterdata && this.cnicfrontImg) {
        this.cnicfrontImg=filterdata.cnicFrontImg
        this.cnicBackImg=filterdata.cnicBackImg
        this.src = this.cnicfrontImg;
        this.show = true;
        this.text = "CNIC Front Side Image";
      } else {
        this.message.create('info', 'No CNIC Front Image Available');
        this.show = false;
      }
    } else if (imageType === 'back') {
      this.cnicBackImg=filterdata.cnicBackImg
      if (filterdata && this.cnicBackImg) {
        this.src = this.cnicBackImg;
        this.show = true;
        this.text = "CNIC Back Side Image";
      } else {
        this.message.create('info', 'No  CNIC Back Image Available');
        this.show = false;
      }
    }
  }
  hideimgModal(){
    this.show = false
  }
}


