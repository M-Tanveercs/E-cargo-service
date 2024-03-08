import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from '../../common.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  pickupSuggestedCities$: Observable<any[]> | undefined;
  dropoffSuggestedCities$: Observable<any[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private cityService: CommonService,
   
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      pickupLocation: [''],
      dropoffLocation: [''],
    });
  }

  search(type: 'pickup' | 'dropoff'): void {
    const searchTerm = type === 'pickup' ? this.searchForm.value.pickupLocation : this.searchForm.value.dropoffLocation;
    const suggestedCities$ = type === 'pickup' ? 'pickupSuggestedCities$' : 'dropoffSuggestedCities$';
    this[suggestedCities$] = this.cityService.getSuggestedCities(searchTerm);
  }

  selectSuggestion(cityName: string, type: 'pickup' | 'dropoff'): void {
    const controlName = type === 'pickup' ? 'pickupLocation' : 'dropoffLocation';
    this.searchForm.get(controlName)?.setValue(cityName); // Update form control value with selected city name
    const suggestedCities$ = type === 'pickup' ? 'pickupSuggestedCities$' : 'dropoffSuggestedCities$';
    this[suggestedCities$] = undefined; // Clear suggestion list
  }

  onSubmit(): void {
    // Handle form submission
    const pickupLocation = this.searchForm.value.pickupLocation;
    const dropoffLocation = this.searchForm.value.dropoffLocation;

    this.cityService.getCoordinates(pickupLocation).subscribe(pickupCoordinates => {
      if (pickupCoordinates) {
        this.cityService.getCoordinates(dropoffLocation).subscribe(dropoffCoordinates => {
          if (dropoffCoordinates) {
            // Calculate distance using Haversine formula
            const distance = this.calculateDistance(
              pickupCoordinates.latitude,
              pickupCoordinates.longitude,
              dropoffCoordinates.latitude,
              dropoffCoordinates.longitude
            );

            console.log('Distance between pickup and drop-off locations:', distance.toFixed(2), 'km');
          } else {
            console.error('Failed to get coordinates for drop-off location:', dropoffLocation);
          }
        });
      } else {
        console.error('Failed to get coordinates for pickup location:', pickupLocation);
      }
    });
  }
 


  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    console.log('distance',d);
    
    return d;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  // services logic
  currentSetIndex = 0;
  totalSets = 3; // Assuming you have 3 sets of cards

  next() {
    if (this.currentSetIndex < this.totalSets - 1) {
      this.currentSetIndex++;
    } else {
      this.currentSetIndex = 0;
    }
  }

  previous() {
    if (this.currentSetIndex > 0) {
      this.currentSetIndex--;
    } else {
      this.currentSetIndex = this.totalSets - 1;
    }
  }
  //frequent ask question 
  expandIconPosition: 'left' | 'right' = 'left';
  activePanelIndex: number = -1; // Initially no panel is active

  setActivePanel(index: number) {
    this.activePanelIndex = index === this.activePanelIndex ? -1 : index;
  }
  panels = [
    {
      active: true,
      name: 'How do I get a price?',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'How do I pay for my delivery?'
    },
    {
      active: false,
      disabled: false,
      name: 'How do I contact the driver?'
    },
    {
      active: false,
      disabled: false,
      name: 'How can I track my job?'
    }

  ];

  array = [1, 2, 3];
}