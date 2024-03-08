import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles-and-goods-info',
  templateUrl: './vehicles-and-goods-info.component.html',
  styleUrls: ['./vehicles-and-goods-info.component.css']
})
export class VehiclesAndGoodsInfoComponent implements OnInit {
  open: boolean=false;

  constructor() { }

  ngOnInit() {
  }

  selectedOption: string = 'Select Vehicle Type';
  selectedImage: string = ''; // Initially empty



  toggleDropdown() {
    this.open = !this.open;
  }

  selectOption(option: string, image: string) {
    this.selectedOption = option;
    this.selectedImage = image;
    this.toggleDropdown(); // Close dropdown after selecting an option
  }

 
}
