import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { AgencyDashService } from '../../agency-dash-bord/agency-dash.service';
import { DriverCommonService } from '../auth/common.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CommonService } from 'src/app/common.service';


@Component({
  selector: 'app-driverDash',
  templateUrl: './driverDash.component.html',
  styleUrls: ['./driverDash.component.css']
})
export class DriverDashComponent implements OnInit {
  username: any;
  userLoginData: any;
  jobcount: any;
  selectedCartItem: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;
  driverId: any;
  data: any[] = [];

  // map variable
  jobId: any;
  pickupdate: any;
  pickuptime: any;
  datePickup: any;
  timePickup: any;
  // userLoginData: any;
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
  marker: any;
  completedJob: any;
  constructor(public commonservice: DriverCommonService, private coreservice: CoreService, private router: Router, private cityService: CommonService) { }
  ngOnInit() {
    debugger
    const loginUser = localStorage.getItem('LoginDriver')
    if (loginUser) {
      this.userLoginData = JSON.parse(loginUser)
      this.userLoginData.forEach((element: {
        id: any; fullName: any;
      }) => {
        this.username = element.fullName
        this.driverId = element.id
        // this.commonservice.getuserrecord(element.id)
        this.commonservice.getAssignDriverrecord( this.driverId)
      });
      console.log(this.username);

    }
    this.getallJobs()

    // this.commonservice.jobAcceptcountData$.subscribe(data => {
    // this.jobcount = data
    // })
    // this.commonservice.jobProcessingcount$.subscribe(data => {
    // this.jobproc = data
    // })
    // this.commonservice.jobonthewaycount$.subscribe(data => {
    // this.jobontheway = data
    // })
    // this.commonservice.jobDeliverCount$.subscribe(data => {
    // this.jobdelv = data
    // })
   this.commonservice.jobDeliverCount$.subscribe(data => {
    this.completedJob=data
  })
   this.userData()
    this.map = L.map('map').setView([0, 0], 10);
    this.startLiveLocationUpdates();
    this.commonservice.getmanageCargo(this.jobId)
  }
 
  startLiveLocationUpdates() {
    this.locationUpdateInterval = setInterval(() => {
      this.userData
      this.initMap();
      console.log('callinterval');
      
      this.getLiveLocation()
      this.drawRoute()
    }, 5000); // Update every 5 seconds, adjust interval as needed
  }
  stopLiveLocationUpdates() {
    // Clear the interval when component is destroyed or no longer needed
    clearInterval(this.locationUpdateInterval);
  }
  ngOnDestroy() {
    // Make sure to stop the interval when the component is destroyed
    this.stopLiveLocationUpdates();
  }
  userData(){
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      debugger

      const data = JSON.parse(userdata);
      this.pickuplocation = data.pickupLocation;
      this.dropoffLocation = data.dropoffLocation;
      this.jobId = data.id
      // Wrap the liveLocation value in an Observable
      this.liveCoordinates$ = of(this.liveLocation);
      console.log("    this.liveCoordinates$", this.liveCoordinates$);

      this.dropoffCoordinates$ = this.cityService.getCoordinates(this.dropoffLocation);
      console.log("this.dropoffCoordinates$ ", this.dropoffCoordinates$);

    }
  }
  async getallJobs() {

    this.data = await this.coreservice.getOrderAssignToDriverBydriverId(this.driverId).toPromise()

  }
  // drawer
  visible = false;
  size: 'large' = 'large';

  get title(): string {
    return `Job Details`;
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
  }

  // map logic




  private initMap(): void {
 
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
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }




    this.dropoffCoordinates$.subscribe(coordinates => {
      if (coordinates) {
        debugger
        console.log("drop", coordinates);

         L.marker([coordinates.latitude, coordinates.longitude],{icon: greenIcon}).addTo(this.map)
          .bindPopup('Drop-off Location').openPopup();
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
  getLiveLocation() {
    var drivericon = L.icon({
      iconUrl: '../../../../../assets/imges/8221800-removebg-preview.png',
      // shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [70, 80], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
    debugger
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position", position);

          const latitude = position.coords.latitude;
          this.liveLocationlatitude = latitude
          console.log("latitude", typeof latitude);

          const longitude = position.coords.longitude;
          console.log("longitude", longitude);

          this.liveLocationlongitude = longitude
          this.liveLocation = { latitude, longitude };




          console.log('Live location:', this.liveLocation);
          if (this.liveLocationlatitude) {
            L.marker([this.liveLocationlatitude, this.liveLocationlongitude],{icon: drivericon}).addTo(this.map).bindPopup('Driver current location').openPopup();
            const jobdata = this.commonservice.managecargodata.find((data: any) => data.trackingId === this.jobId)
            if (jobdata) {
              jobdata.driverLocation = this.liveLocation
              this.commonservice.updateManageCartgo(jobdata?.id, jobdata);
            }
          }

        },
        (error) => {
          console.error('Error getting live location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  drawRoute(): void {

    this.dropoffCoordinates$.subscribe(dropoffCoordinates => {
      if (dropoffCoordinates) {

        if (this.liveLocation && this.liveLocation.latitude && this.liveLocation.longitude && this.dropoffCoordinates$) {
          const pickUpLatLng = L.latLng(this.liveLocation.latitude, this.liveLocation.longitude);
          const dropOffLatLng = L.latLng(dropoffCoordinates.latitude, dropoffCoordinates.longitude);


          // Clear previous routes if any
          if (this.map) {
            this.map.eachLayer((layer: any) => {
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
           // Fit the map bounds to the route
        const bounds = L.latLngBounds([pickUpLatLng, dropOffLatLng]);
        this.map.fitBounds(bounds);
        }
      }
    });

  }
}


