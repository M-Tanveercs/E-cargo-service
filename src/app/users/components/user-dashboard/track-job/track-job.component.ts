import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashCommonService } from '../dash-common.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


import { NzImageService } from 'ng-zorro-antd/image';
import { CommonService } from 'src/app/common.service';


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
  constructor(private route: ActivatedRoute, private commonservice: DashCommonService, private nzImageService: NzImageService, private cityService: CommonService) { }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
      this.commonservice.getmanageCargo(this.jobId);
      this.commonservice.getUserBookingReacodByID(this.jobId);

    });
    // Assuming you want to display the date and time of the first element in managecargodata



    this.commonservice.managecargodata.forEach((element: {
      trackingId: any;
      id: any;
    }) => {

      // this.cargoId=element.id; 
      this.trackingid = element.trackingId
      // alert(this.cargoId); 


    });
    if (this.trackingid === this.jobId) {
      const element = this.commonservice.managecargodata[0]; // Get the first element

      const date = new Date(element.currentDate);
      const time = new Date(element.pickuptime);
      this.datePickup = date.toLocaleDateString('en-US');
      this.timePickup = time.toLocaleTimeString('en-US');
      this.deliveryProf = element.deliveryProof
      console.log(this.deliveryProf);
      this.ReciverSignature = element.reciverSignature
      console.log(this.ReciverSignature);
      this.status = element.cargoStatus
      if (this.status === 'Processing') {
        this.curentvalue = 3
      } else if (this.status === 'On the Way') {
        this.curentvalue = 4
      } else if (this.status === 'Delivered') {
        this.curentvalue = 7
      } else {
        this.curentvalue = 1
      }
    }


    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      debugger

      const data = JSON.parse(userdata);
      this.pickuplocation = data.pickupLocation;
      this.dropoffLocation = data.dropoffLocation;
      // Wrap the liveLocation value in an Observable
      const trackingdata=this.commonservice.managecargodata.find((filter:any)=>filter.trackingId ===data.id)
      this.liveCoordinates$ = of(trackingdata.driverLocation);
      console.log("    this.liveCoordinates$", this.liveCoordinates$);

      this.dropoffCoordinates$ = this.cityService.getCoordinates(this.dropoffLocation);
      console.log("this.dropoffCoordinates$ ", this.dropoffCoordinates$);

    }
    this.initMap();
    // this.getLiveLocation()
this.drawRoute()
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
    this.map = L.map('map').setView([0, 0], 10);

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
        console.log("drop", coordinates);

        L.marker([coordinates.latitude, coordinates.longitude],{icon: drivericon}).addTo(this.map)
          .bindPopup('Driver Location').openPopup();
      }
    });
  }



  onClick(imageType: string): void {
    if (imageType === 'prof') {
      this.src = this.deliveryProf;
      this.show = true
    } else if (imageType === 'sign') {
      this.src = this.ReciverSignature;
    }


  }
  // getLiveLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("position", position);

  //         const latitude = position.coords.latitude;
  //         this.liveLocationlatitude = latitude
  //         console.log("latitude", typeof latitude);

  //         const longitude = position.coords.longitude;
  //         console.log("longitude", longitude);

  //         this.liveLocationlongitude = longitude
  //         this.liveLocation = { latitude, longitude };
  //         console.log('Live location:', this.liveLocation);
  //         if (this.liveLocationlatitude) {
  //           L.marker([this.liveLocationlatitude, this.liveLocationlongitude]).addTo(this.map)
  //             .bindPopup('Pick-up Location').openPopup();
  //         }
  //       },
  //       (error) => {
  //         console.error('Error getting live location:', error.message);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }
  drawRoute(): void {
  
      this.dropoffCoordinates$.subscribe(dropoffCoordinates => {
        if (dropoffCoordinates) {
          
          if(this.liveLocation && this.liveLocation.latitude && this.liveLocation.longitude && this.dropoffCoordinates$){
            const pickUpLatLng = L.latLng(this.liveLocation.latitude, this.liveLocation.longitude);
            const dropOffLatLng = L.latLng(dropoffCoordinates.latitude, dropoffCoordinates.longitude);
            
  
          // Clear previous routes if any
          if (this.map) {
            this.map.eachLayer((layer:any) => {
              if (layer instanceof (L as any).Routing.Control) {
                this.map.removeControl(layer);
              }
            });
          }
  
          // Create a routing control and add it to the map
          (L as any).Routing.control({
            waypoints: [pickUpLatLng, dropOffLatLng],
            routeWhileDragging: true
          }).addTo(this.map);
          }
        }
      });
    
  }
  
  

}
