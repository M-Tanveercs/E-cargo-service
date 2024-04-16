import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private modeSubject = new BehaviorSubject<boolean>(true);
  darkMode$ = this.modeSubject.asObservable();
  constructor(private http: HttpClient) {}
  toggleDarkMode(): void {
    const newDarkModeValue = !this.modeSubject.value;
    this.modeSubject.next(newDarkModeValue);
    // window.localStorage.setItem('darkMode', JSON.stringify(newDarkModeValue));
  }
  getSuggestedCities(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}&countrycodes=PK&limit=10`)
      .pipe(
        map((cities: any[]) => this.extractCityData(cities))
      );
  }

  getCoordinates(cityName: string): Observable<{ latitude: number, longitude: number } | undefined> {
    return this.http.get<any[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}&countrycodes=PK&limit=1`)
      .pipe(
        map((response: any[]) => {
          if (response.length > 0) {
            return {
              latitude: parseFloat(response[0].lat),
              longitude: parseFloat(response[0].lon)
            };
          } else {
            return undefined;
          }
        })
      );
  } 

  

  private extractCityData(cities: any[]): any[] {
    return cities.map(city => ({
      name: city.display_name
    }));
  }
}
