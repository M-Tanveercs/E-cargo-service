import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedPayment:string = 'Card Payment';
  selectedPayment1: string = 'Initial Payment';
  checked=false;





}
