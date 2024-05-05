import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashCommonService } from '../dash-common.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


import { NzImageService } from 'ng-zorro-antd/image';
import { CommonService } from 'src/app/common.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-track-job',
  templateUrl: './track-job.component.html',
  styleUrls: ['./track-job.component.css']
})
export class TrackJobComponent implements OnInit {
  jobId: any;
  pickupdate: any;
  pickuptime: any;
  datePickup: any;
  timePickup: any;
  userLoginData: any;
  trackingid: any;
  status: any;
  curentvalue: any;
  prof: any;
  sign: any;
  deliveryProf: any;
  ReciverSignature: any;
  show: boolean = false;
  src: any;
  pickuplocation: any;
  dropoffLocation: any;
  liveCoordinates$!: Observable<{ latitude: number, longitude: number } | undefined>;
  dropoffCoordinates$!: Observable<{ latitude: number, longitude: number } | undefined>;
  map!: L.Map;
  liveLocation: { latitude: number, longitude: number } | undefined;
  liveLocationlatitude: any;
  liveLocationlongitude: any;
  private locationUpdateInterval: any;
  dropoffCoordinates: any;
  mangcargoData: any;
  text: any;
  constructor(private route: ActivatedRoute, private commonservice: DashCommonService, private nzImageService: NzImageService, private cityService: CommonService,private message:NzMessageService) { }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
   

    });
    this.fetchData()
    

  }
  async fetchData() {
    try {
      await this.commonservice.getmanageCargo(this.jobId);
    this.commonservice.getUserBookingReacodByID(this.jobId);// Wait for getmanageCargo to complete
      this.checkTracking(); // Call checkTracking after getmanageCargo
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async checkTracking() {
    try {
      const dataForTracking= localStorage.getItem('managecargodata') // managecargodata
      if(dataForTracking){
        this.mangcargoData=JSON.parse(dataForTracking)
      }
      this.commonservice.managecargodata$.subscribe((data)=>{
        this.mangcargoData=data
      })
      this.mangcargoData.forEach((element: {
        trackingId: any;
        _id: any;
      }) => {
        
        // this.cargoId=element.id; 
        this.trackingid = element.trackingId
        // alert(this.cargoId); 
        
        
      });
      if (this.trackingid === this.jobId) {
        const trackingData = this.mangcargoData[0]; // Get the first element
        
    
        const date = new Date(trackingData.currentDate);
        const time = new Date(trackingData.pickuptime);
        this.datePickup = date.toLocaleDateString('en-US');
        this.timePickup = time.toLocaleTimeString('en-US');
        this.deliveryProf = trackingData.deliveryProof
        console.log(this.deliveryProf);
        this.ReciverSignature = trackingData.reciverSignature
        console.log(this.ReciverSignature);
        this.status = trackingData.cargoStatus
        if (this.status === 'Processing') {
          this.curentvalue = 3
        } else if (this.status === 'On the Way') {
          this.curentvalue = 4
        } else if (this.status === 'Delivered') {
          this.curentvalue = 7
        } else {
          this.curentvalue = 1
        }
        this.map = L.map('map').setView([0, 0], 10);
        this.refresh()
      }else{
        this.message.create('info', 'No Tracking Data Available');
      }
    } catch (error) {
      console.error('Error checking tracking:', error);
    }
    }
  
  refresh(){
    this.getmapData()
    this.initMap();
    console.log('setinterval call');
    
    // this.getLiveLocation()
    this.drawRoute()
   }
   ngOnDestroy(): void {
  this.status=''
  }
  getmapData(){
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      debugger
  
      const data = JSON.parse(userdata);
      this.pickuplocation = data.pickupLocation;
      this.dropoffLocation = data.dropoffLocation;
      // Wrap the liveLocation value in an Observable
      const trackingdata=this.mangcargoData.find((filter:any)=>filter.trackingId ===data._id)
      this.liveCoordinates$ = of(trackingdata.driverLocation);
      console.log("    this.liveCoordinates$", this.liveCoordinates$);
  this.liveCoordinates$.subscribe((driverData)=>{
  console.log('driverData', driverData);
  this.liveLocation=driverData
  
  })
      this.dropoffCoordinates$ = this.cityService.getCoordinates(this.dropoffLocation);
      this.dropoffCoordinates$.subscribe(data=>{
        console.log('dropData',data);
        this.dropoffCoordinates=data
        
      })
      // console.log("this.dropoffCoordinates$ ", this.dropoffCoordinates$);
  
    }
  }
  



 
  



  onClick(imageType: string): void {
    debugger;
    if (imageType === 'prof') {
      if (this.deliveryProf) {
        this.src = this.deliveryProf;
        this.show = true;
        this.text = "Delivery Proof";
      } else {
        this.message.create('info', 'No Delivery Proof Image Available');
        this.show = false;
      }
    } else if (imageType === 'sign') {
      if (this.ReciverSignature) {
        this.src = this.ReciverSignature;
        this.show = true;
        this.text = "Receiver Signature";
      } else {
        this.message.create('info', 'No Receiver Signature Image Available');
        this.show = false;
      }
    }
  }
  hideimgModal(){
    this.show = false
  }

  private initMap(): void {


  
    var drivericon = L.icon({
      iconUrl: '../../../../../assets/imges/8221800-removebg-preview.png',
      // shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [70, 80], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  var greenIcon = L.icon({
    iconUrl: '../../../../../assets/imges/46831-removebg-preview.png',
    // shadowUrl: 'leaf-shadow.png',
  
    iconSize:     [70, 80], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
   
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    
    debugger
  
    
  
  
  
    this.dropoffCoordinates$.subscribe(coordinates => {
      if (coordinates) {
        debugger
        console.log("drop", coordinates);
  
        L.marker([coordinates.latitude, coordinates.longitude],{icon: greenIcon}).addTo(this.map)
          .bindPopup('Drop-off Location').openPopup();
      }
    });
    this.liveCoordinates$.subscribe(coordinates => {
      if (coordinates) {
        debugger
        console.log("driver", coordinates);
  
        L.marker([coordinates.latitude, coordinates.longitude],{icon: drivericon}).addTo(this.map)
          .bindPopup('Driver Location').openPopup();
      }
    });
  }
  drawRoute(): void {
    this.dropoffCoordinates$.subscribe(dropoffCoordinates => {
      if (this.dropoffCoordinates && this.liveLocation && this.liveLocation.latitude && this.liveLocation.longitude) {
        const pickUpLatLng = L.latLng(this.liveLocation.latitude, this.liveLocation.longitude);
        const dropOffLatLng = L.latLng(this.dropoffCoordinates.latitude, this.dropoffCoordinates.longitude);
  
        // Clear previous routes if any
        if (this.map) {
          this.map.eachLayer((layer: any) => {
            if (layer instanceof (L as any).Routing.Control) {
              this.map.removeControl(layer);
            }
          });
        }
  
        // Create a routing control and add it to the map
        const control = (L as any).Routing.control({
          waypoints: [
            L.latLng(this.liveLocation.latitude, this.liveLocation.longitude),
            L.latLng(this.dropoffCoordinates.latitude, this.dropoffCoordinates.longitude)
          ],
          routeWhileDragging: true,
          
          
        }).addTo(this.map);
  
        // Fit the map bounds to the route
        const bounds = L.latLngBounds([pickUpLatLng, dropOffLatLng]);
        this.map.fitBounds(bounds);
      }
    });
  }
  
  
  

}
