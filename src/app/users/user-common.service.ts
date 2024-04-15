import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserCommonService {
  selectedVehicle: string = '';
  selectedVehicleImg:string='' // Holds the selected vehicle
  estimatedWeight: string = ''; // Holds the estimated weight
  selectedGoodsType: string = ''; // Holds the selected goods type
  selectedHelper: string = ''; // Holds the selected helper
distance:any
  totalVechialPrice:any;
  users: { userId: number, distance: number,SelectedVehicle:string,selectedVehicleImg:string,estimatedWeight:string,selectedGoodsType:string,selectedHelper:string,totalVechialPrice:any,pickupLocation:any,dropoffLocation:any }[] = [];
  randomUserId: any;
  pickupLocation: any;
  dropoffLocation: any;
  orderSuccessful: boolean=false
  rafranceId:number=0
  url='';
constructor(private router:Router) {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    this.users = JSON.parse(storedUsers);
    console.log('usersData:',this.users);
    
  }
 }
calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number,pickupLocation:any,dropoffLocation:any): number {
  debugger
  const R = 6371; // Radius of the Earth in km
  const dLat = this.degreesToRadians(lat2 - lat1);
  const dLon = this.degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  this.distance= Math.floor(d) 
  console.log('distance between dropoff and pick up location: ' +  this.distance);
  this.randomUserId = Math.floor(1000 + Math.random() * 9000);

 this.pickupLocation=pickupLocation;
 this.dropoffLocation=dropoffLocation
  return this.distance;
}

degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
getFormData(){
  debugger
  console.log('Selected Vehicle:', this.selectedVehicle);
  console.log('Selected Vehicle img:', this.selectedVehicleImg);
  console.log('Estimated Weight:', this.estimatedWeight);
  console.log('Selected Goods Type:', this.selectedGoodsType);
  console.log('Selected Helper:', this.selectedHelper);
}
calculatePrice(distance: number): number {
  // Base price per kilometer for each vehicle type
  const basePricePerKm: { [vehicle: string]: number } = {
   'Loader Rickshaw ( Upto 1 TON )': 5,
    'Suzuki Ravi ( Upto 1.2 TON )':10,
    'Hyundai Shehzore ( Upto 2.5 TON )': 20,
    'Master Shehzore ( Upto 3 TON )': 30,
    'Mazda Open 12" (Upto 3.5 TON)': 35,
    'Mazda Open 14" (Upto 4 TON)': 40,
    'Mazda Open 16" (Upto 10 TON)': 50,
    'Mazda Open 18" (Upto 10 TON)': 50,
    'Mazda Open 20" (Upto 7 TON)': 55,
    'Mazda Open 22" (Upto 6 TON)': 55,
    'Mazda Open 24" (Upto 6.5 TON)': 60,
    'Mazda Container 17" (Upto 7 TON)': 65,
    'Mazda Container 20" (Upto 7 TON)': 60,
    'Mazda Container 22" (Upto 5 TON)': 50,
    'Mazda Container 24" (Upto 5 TON)': 50,
    'Mazda Container 26" (Upto 5 TON)': 50,
    '40" Container 14 Wheeler (Upto 15 TON)': 80,
    '40" Container 18 Wheeler (Upto 25 TON)': 85,
    '40" Container 22 Wheeler (Upto 40 TON)': 90,
    '40"  Flat Bed 18 Wheeler (Upto 25 TON)': 100,
    '40"  Flat Bed 22 Wheeler (Upto 40 TON)': 110,
    'Bedford Truck (Upto 20 TON)': 90,
    '10 Wheeler  (Upto 35 TON)': 90,
  };

  // Additional charges for helpers
  const helperCharges: { [helper: string]: number } = {
    'None': 0,
    '1': 1000,
    '2': 2000,
    '3': 3000,
    '4': 4000,
    // Add more helper options and their charges as needed
  };

  // Get the base price for the selected vehicle
  const basePrice = basePricePerKm[this.selectedVehicle] || 0;

  // Get the additional charges for the selected helper
  const helperCharge = helperCharges[this.selectedHelper] || 0;

  // Calculate the total price
 
if (this.url === 'edit') {
  // Retrieve the edit detail from local storage
  const editDetail = JSON.parse(localStorage.getItem('editdetail') || '{}');
  const totalPrice = (basePrice * editDetail.distance) + helperCharge;
  this.totalVechialPrice = totalPrice
  // Retrieve the users from local storage
  const usersData = JSON.parse(localStorage.getItem('users') || '[]');

  // Find the user to be edited in the users array
  const editedUserIndex = usersData.findIndex((user: any) => user.userId === editDetail.userId);

  if (editedUserIndex !== -1) {
    // Update only the fields that need to be changed
    usersData[editedUserIndex] = {
      ...usersData[editedUserIndex], // Keep the previous data unchanged
      SelectedVehicle: this.selectedVehicle,
      selectedVehicleImg: this.selectedVehicleImg,
      estimatedWeight: this.estimatedWeight,
      selectedGoodsType: this.selectedGoodsType,
      selectedHelper: this.selectedHelper,
      totalVechialPrice:this.totalVechialPrice, // Update the total vehicle price
    };

    // Save the updated user data back to local storage
    localStorage.setItem('users', JSON.stringify(usersData));
    this.router.navigate(['/booking'])
  }
  return totalPrice;
 
 }else{
  
  const totalPrice = (basePrice * distance) + helperCharge;
  this.totalVechialPrice = totalPrice
   // Check if any previous user exists in local storage
   localStorage.setItem('users','');
   this.users.splice(0)
   // Store the user ID and distance in the array
   this.users.push({userId: this.randomUserId, distance: this.distance,SelectedVehicle:this.selectedVehicle,selectedVehicleImg:this.selectedVehicleImg,estimatedWeight:this.estimatedWeight,selectedGoodsType:this.selectedGoodsType,selectedHelper:this.selectedHelper,totalVechialPrice:this.totalVechialPrice,pickupLocation:this.pickupLocation,dropoffLocation:this.dropoffLocation});
 
   // Save the updated user array to local storage
   localStorage.setItem('users', JSON.stringify(this.users));
   this.router.navigate(['/pricing'])
   return totalPrice;
 }

}
calculatePriceAndDisplay(url:any): void {
  this.url=url
  const totalPrice = this.calculatePrice(this.distance);
  console.log('Total Price:', totalPrice);
 
}


}
