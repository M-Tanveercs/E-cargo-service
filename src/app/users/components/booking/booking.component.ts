import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  users: any;
  pickupLocation: any;
  dropoffLocation: any;
  vehicleType: any;
  goodsTypes: any;
  helpercount: any;
  totalDistance: any;
  date: any;
  time: any;
  totalVechialPrice: any;
  initailaPayment: any;
  remainPayment: any;

  constructor( private router:Router) { }

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      console.log('pricing_usersData:',this.users);
      this.users.forEach((userData: {
        totalVechialPrice: any;
        time: any;
        date: any;
        distance: any;
        selectedHelper: any;
        selectedGoodsType: any;
        SelectedVehicle: any;
        pickupLocation:any,
        dropoffLocation:any

}) => {
    this.pickupLocation=userData.pickupLocation;
    this.dropoffLocation=userData.dropoffLocation    ;
    this.vehicleType=userData.SelectedVehicle;
    this.goodsTypes=userData.selectedGoodsType;
    this.helpercount=userData.selectedHelper;
    this.totalDistance=userData.distance;
      this.date=userData.date;
      this.time=userData.time;
      this.totalVechialPrice=userData.totalVechialPrice  
this.initailaPayment=(this.totalVechialPrice*40)/100
this.remainPayment=(this.totalVechialPrice-this.initailaPayment)
      });
      
    }

       
  }
  selectedPayment:string = 'Cash on Delivery';
  selectedPayment1: string = 'Initial Payment';
  checked=false;

  checkout(){
    debugger
  if(this.selectedPayment==='Card Payment'){
    alert('Sorry! Payment Method Not Available Yet. You can go with Cash on Delivery')
  }else{
this.router.navigate(['/booking/success'])
  }
    
  }



}
