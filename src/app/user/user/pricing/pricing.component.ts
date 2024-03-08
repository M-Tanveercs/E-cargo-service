

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  selectedPeriod: string = 'AM'; // 'AM' or 'PM'
  randomNumber: string | undefined;

  constructor() { }

  ngOnInit() {
    this.generateRandomNumber();
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
  }

  generateRandomNumber() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.randomNumber = randomNumber.toString();
  }
}
