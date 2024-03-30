import { Component, OnInit } from '@angular/core';
import { UserCommonService } from '../../user-common.service';

import { CoreService } from 'src/app/core/core.service';
import { AuthService } from 'src/app/users/userAuth.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

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
  sendername: any;
  reciverName: any;
  senderPhonenumber: any;
  receiverPhoneNUmber: any;
  estimatedWeight: any;
  helper: any;
  loginuserid: any;
  bookingrecord:any[]=[]
  userbookingdata:any
  pickupTime: any;

  constructor(public commonService:UserCommonService,private authservice:AuthService, private coreService:CoreService) { }

  ngOnInit() {
    const getrecord=localStorage.getItem('UserBookingRecord');
    if(getrecord){
    this.bookingrecord=JSON.parse(getrecord);
    }
    debugger
    this.commonService.orderSuccessful=true

    this.commonService.rafranceId=this.generateRandomNumber();
    console.log(this.commonService.rafranceId);

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      console.log('pricing_usersData:',this.users);
      this.users.forEach((userData: {
        pickupTime: any;
        totalVechialPrice: any;
        time: any;
        date: any;
        distance: any;
        selectedHelper: any;
        selectedGoodsType: any;
        SelectedVehicle: any;
        pickupLocation:any,
        dropoffLocation:any,
        fullName:any,
        receiverName:any,
        phoneNumber:any,
        receiverPhoneNumber:any,
 
        estimatedWeight:any,
}) => {
    this.pickupLocation=userData.pickupLocation;
    this.dropoffLocation=userData.dropoffLocation    ;
    this.vehicleType=userData.SelectedVehicle;
    this.goodsTypes=userData.selectedGoodsType;
    this.helpercount=userData.selectedHelper;
    this.totalDistance=userData.distance;
      this.date=userData.date;
      this.time=userData.time;
      this.sendername=userData.fullName
      this.reciverName=userData.receiverName
      this.senderPhonenumber=userData.phoneNumber
      this.receiverPhoneNUmber=userData.phoneNumber
      this.totalVechialPrice=userData.totalVechialPrice 
      this.estimatedWeight=userData.estimatedWeight
     this.pickupTime=userData.pickupTime
this.initailaPayment=(this.totalVechialPrice*40)/100
this.remainPayment=(this.totalVechialPrice-this.initailaPayment)
      });
      
    } // Output: a 6-digit random number

      // Get the logged-in user details
      const loginUserData = JSON.parse(localStorage.getItem('LoginUser') || '{}');
     
      loginUserData.forEach((loginuser:any)=>{
this.loginuserid=loginuser.id;
      })
      
      // Update the userId with the loginId

      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
        this.users.forEach((userData: any) => {
          userData.userId = this.loginuserid;
          this.userbookingdata=userData
          this.createUserRecord(userData)
        });
        // Update the users array in local storage
        localStorage.setItem('users', JSON.stringify(this.users));
      
        // Create a copy of the users array and push it to bookinkrecord
       this.bookingrecord.push(this.userbookingdata)
      
        // Store the booking record in local storage
        localStorage.setItem('UserBookingRecord', JSON.stringify(this.bookingrecord));
       
      }}
      createUserRecord(userData: any) {
        // Assuming users data is available and you want to send it to the server
        this.coreService.createUserBookingReacod(userData).subscribe(data=>{
          console.log(data);
          
          
        })
      }

      // addPerson() {
      //   this.apiService.addPerson(this.person)
      //     .subscribe(data => {
      //       console.log(data)
      //       this.refreshPeople();
      //     })      
      // }
 generateRandomNumber(): number {
    // Generate a random number between 100000 and 999999
    return Math.floor(Math.random() * 900000) + 100000;
  }
  

  
}
