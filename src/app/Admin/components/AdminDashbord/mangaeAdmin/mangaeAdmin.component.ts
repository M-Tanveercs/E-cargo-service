import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminCommonService } from 'src/app/Admin/adminCommon.service';
import { CoreService } from 'src/app/core/core.service';
interface DataItem {
  name: string;
  email: number;
  _id:any,
  password:any;

}
@Component({
  selector: 'app-mangaeAdmin',
  templateUrl: './mangaeAdmin.component.html',
  styleUrls: ['./mangaeAdmin.component.css']
})
export class MangaeAdminComponent implements OnInit {
  selectedCartItem: any;
  form!: FormGroup;
  submitted = false;
  drawertype:any
  passwordVisible = false;
  UserData: any[]=[];
  userId: any;
  constructor(private fb: FormBuilder, private message: NzMessageService, private coreService: CoreService,public commonservice:AdminCommonService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
   this.getAllRequireData()
  }
  async getAllRequireData(){
    debugger
  const response= await  this.coreService.getAdminRecord().toPromise()
   this.UserData=response
   this.listOfData = this.UserData
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
    
      this.coreService.postAdminRecord(formData).subscribe(
        data => {
          console.log(data);
          this.message.create('success', `New User Added successfully`);
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

      return `Add New Admin`;
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

  listOfData: DataItem[] = this.UserData
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
   
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) =>
      item.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
  
  closeDropdown(){
this.visibletable=false

  }
  deleteUser(id:any){
    debugger
    
this.coreService.delAdminRecordByID(id).subscribe(user =>{
  this.getAllRequireData()
    this.message.create('success', `Admin Deleted successfully`);
})
  }
 
  EditUserDetail(id:any){
    debugger
    this.drawertype="edit"
    
      let userData
     userData=this.UserData.filter(user => user._id==id)
      userData.forEach((element:any) => {
        this.form.patchValue({
          name:element.name,
         
          email:element.email,
       
          password:element.password,
        })
        this.userId=element._id
      });
    
    this.open()


  }
  
  updateUserDetail() {
    this.submitted = true;
    debugger
    if (this.form.valid) {
      // Handle form1 submission logic here
      console.log(this.form.value);
      let formData = this.form.value 
     
      this.coreService.updateAdminRecordByID(this.userId,formData).subscribe(
        data => {
          console.log(data);
          this.message.create('success', `Admin Update successfully`);
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
}


