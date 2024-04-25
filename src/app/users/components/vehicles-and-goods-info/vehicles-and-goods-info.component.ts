import { Component, OnInit } from '@angular/core';
import { UserCommonService } from '../../user-common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-vehicles-and-goods-info',
  templateUrl: './vehicles-and-goods-info.component.html',
  styleUrls: ['./vehicles-and-goods-info.component.css']
})
export class VehiclesAndGoodsInfoComponent implements OnInit {
  vehicleWeightMap: { [key: string]: string } = {
    'Loader Rickshaw ( Upto 1 TON )': '1 TON',
    'Suzuki Ravi ( Upto 1.2 TON )': '1.2 TON',
    'Hyundai Shehzore ( Upto 2.5 TON )': '2.5 TON',
    'Master Shehzore ( Upto 3 TON )': '3 TON',
    'Mazda Open 12" (Upto 3.5 TON)': '3.5 TON',
    'Mazda Open 14" (Upto 4 TON)': '4 TON',
    'Mazda Open 16" (Upto 10 TON)': '10 TON',
    'Mazda Open 18" (Upto 10 TON)': '10 TON',
    'Mazda Open 20" (Upto 7 TON)': '7 TON',
    'Mazda Open 22" (Upto 6 TON)': '6 TON',
    'Mazda Open 24" (Upto 6.5 TON)': '6 TON',
    'Mazda Container 17" (Upto 7 TON)': '7 TON',
    'Mazda Container 20" (Upto 7 TON)': '7 TON',
    'Mazda Container 22" (Upto 5 TON)': '5 TON',
    'Mazda Container 24" (Upto 5 TON)': '5 TON',
    'Mazda Container 26" (Upto 5 TON)': '5 TON',
    '40" Container 14 Wheeler (Upto 15 TON)': '15 TON',
    '40" Container 18 Wheeler (Upto 25 TON)': '25 TON',
    '40" Container 22 Wheeler (Upto 40 TON)': '40 TON',
    '40"  Flat Bed 18 Wheeler (Upto 25 TON)': '25 TON',
    '40"  Flat Bed 22 Wheeler (Upto 40 TON)': '40 TON',
    'Bedford Truck (Upto 20 TON)': '20 TON',
    '10 Wheeler  (Upto 35 TON)': '35 TON'
  };
  open: boolean = false;
  selectedOption: string = 'Select Vehicle Type';
  selectedImage: string = '';
  estimatedWeight: string = '';
  selectedGoodsType: string = 'Select Goods Type';
  selectedHelper: string = 'None';
  allowedWeight: any;
  isSubmitDisabled = true;
  // Define form group
  vehicleGoodsForm: FormGroup = new FormGroup({});
  url: any;
 
  vehicleTypesdata: any;
  goodsTypesdata: any;
  helperCount: any;
  loading:boolean=false
  constructor(private route: ActivatedRoute,public userCommonService: UserCommonService, private fb: FormBuilder,private coreService:CoreService,
    private message: NzMessageService
  ) { 

    // Initialize form group and set up form controls
    this.vehicleGoodsForm = this.fb.group({
   
     // Require selection of goods type
     selectedDriver: ['None'] // Optional selection of helper
    });
    this.vehicleGoodsForm.valueChanges.subscribe(() => {
      this.updateSubmitButtonStatus();
      this.validateEstimatedWeight();
    });
  }

  validateEstimatedWeight(): void {
    debugger
    const estimatedWeightControl:any = this.vehicleGoodsForm.get('estimatedWeight');
    const estimatedWeight = parseFloat(estimatedWeightControl.value);
    
    if (!isNaN(estimatedWeight) && estimatedWeight > this.allowedWeight) {
      estimatedWeightControl.setErrors({ 'maxWeightExceeded': true });
      this.updateSubmitButtonStatus();
    } else {
      estimatedWeightControl.setErrors(null);
      this.updateSubmitButtonStatus();
    }
  }
  updateSubmitButtonStatus(): void {
    this.isSubmitDisabled = this.vehicleGoodsForm.invalid;
  }
  ngOnInit() {
    this.userCommonService.spinner()

    this.route.url.subscribe(url => {
      if (url[url.length - 1].path === 'edit') {
        console.log(url[1].path);
        this.url=url[1].path
        if (this.url === 'edit') {
          const editDetail = JSON.parse(localStorage.getItem('editdetail') || '{}');
          this.selectOption(editDetail.vehicleType,editDetail.selectedVehicleImg
            )
            this.toggleDropdown()
          this.vehicleGoodsForm.patchValue({
            estimatedWeight: editDetail.EstimatedWeight,
            selectedGoodsType: editDetail.goodsTypes,
            selectedHelper: editDetail.helpercount
          });
        }}
    });

  this.coreService.getVehicleTypesRecord().subscribe(
    (response) => {

        this.vehicleTypesdata = response;
   console.log(this.vehicleTypesdata);
    },
   
  );
  this.coreService.getGoodsTypesRecord().subscribe(
    (response) => {

        this.goodsTypesdata = response;
   console.log(this.goodsTypesdata);
    },
   
  );
  this.coreService.getHelperCountRecord().subscribe(
    (response) => {

        this.helperCount = response;
   console.log(this.helperCount);
    },
   
  );
  }


  toggleDropdown() {
    this.open = !this.open;
  }

  private extractNumericPart(allowedWeight: string): number {
    // Use regular expression to extract numeric part
    const numericPart = parseFloat(allowedWeight.match(/\d+(\.\d+)?/)?.[0] || '0');
    return numericPart;
  }
  
  selectOption(option: string, image: string) {

    // Remove &quot; from the option string
    this.selectedOption = option.replace(/&quot;/g, '');
    this.selectedImage = image;
    this.toggleDropdown();
  console.log(typeof this.selectedOption);
  
    // Get the weight from the mapping
    this.allowedWeight = this.extractNumericPart(this.vehicleWeightMap[this.selectedOption]);

    
    console.log(this.allowedWeight);
  }
  

  onSubmit(){
    debugger
    this.loading = true;

    this.createBasicMessage()

    // Check if form is valid
    if (this.vehicleGoodsForm.valid) {
      // Get form values
    
      const estimatedWeight = this.vehicleGoodsForm.value.estimatedWeight;
      const selectedGoodsType = this.vehicleGoodsForm.value.selectedGoodsType;
      const selectedHelper = this.vehicleGoodsForm.value.selectedHelper;
  
      // Log form values to console
      
      this.userCommonService.selectedVehicle= this.selectedOption
      this.userCommonService.selectedVehicleImg= this.selectedImage
      this.userCommonService.estimatedWeight= estimatedWeight
      this.userCommonService.selectedGoodsType= selectedGoodsType
      this.userCommonService.selectedHelper= selectedHelper
      this.userCommonService.getFormData()
  
      setTimeout(() => {
        // Navigate to another route after a delay (simulating data loading)
        this.loading = true;

        this.userCommonService.calculatePriceAndDisplay(this.url)
      }, 2000); 
      // Proceed with further operations or calculations
    } else {
      // Form is invalid, handle accordingly (e.g., display error message)
      console.log('Form is invalid');
    }
  }
  createBasicMessage(): void {
    this.message
      .loading('Action in progress', { nzDuration: 1800 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Calculating Price', { nzDuration: 1800 }).onClose!),
        concatMap(() => this.message.info('Calculating Price successfully', { nzDuration: 1800 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }
}
