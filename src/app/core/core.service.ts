import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createUserBookingReacod(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/usersBookingRecord`, data);
  }


  getUserBookingReacod(userId:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`http://localhost:3000/usersBookingRecord/?userId=${userId}`);
  }

  signupUserRecord(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/signup`, data);
  }

  getsignupUserRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/signup`);
  }
  createUserBookingcancelReacod(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    console.log('create cancel ordertable',this.http.post<any>(`http://localhost:3000/cancelOrder`, data));
    
    return this.http.post<any>(`http://localhost:3000/cancelOrder`, data);
  }
  getUserBookingCanceldRecod(id:any): Observable<any> {
    
    
    
    return this.http.get<any>(`http://localhost:3000/cancelOrder/?userId=${id}`);
  }
  getUserBookingReacodtocancel(id:any): Observable<any> {
    
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    console.log('getcancelbookin',this.http.get<any>(`http://localhost:3000/usersBookingRecord/${id}`));
    
    return this.http.get<any>(`http://localhost:3000/usersBookingRecord/${id}`);
  }
  deleteUserRecord(id: any): Observable<any> {
    console.log('deleteUserRecord',this.http.delete<any>(`http://localhost:3000/usersBookingRecord/${id}`));
    
    return this.http.delete<any>(`http://localhost:3000/usersBookingRecord/${id}`);
  }
  deletecancelRecord(id: any): Observable<any> {
 
    
    return this.http.delete<any>(`http://localhost:3000/cancelOrder/${id}`);
  }

}
