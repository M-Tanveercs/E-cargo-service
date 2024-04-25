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
  updateuserOrder( updatedData: any) {
    const id=updatedData.id
        return this.http.put(`http://localhost:3000/usersBookingRecord/${id}`, updatedData); // Send a PUT request to update the post
      }

  getUserBookingReacod(userId:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`http://localhost:3000/usersBookingRecord/?userId=${userId}`);
  }
  
  updateSignUp(postId: number, updatedData: any) {

    return this.http.put(`http://localhost:3000/signup/${postId}`, updatedData); // Send a PUT request to update the post
  }
  getUserBookingReacodByID(Id:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`http://localhost:3000/usersBookingRecord/${Id}`);
  }
  getAllUserBookingReacod(): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`http://localhost:3000/usersBookingRecord`);
  }

  signupUserRecord(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/signup`, data);
  }

  getsignupUserRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/signup`);
  }
  getsignupUserRecordById(id:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/signup/${id}`);
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
  getVehicleTypesRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/vehicle_Types`);
  }
  getGoodsTypesRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/goodsTypes`);
  }
  getHelperCountRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/helper`);
  }
  getPickUpTimeRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/pickupTime`);
  }
  signupAgencyRecord(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/AgencySignUp`, data);
  }
  getsignupAgencyRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/AgencySignUp`);
  }
  getsignupAgencyRecordbyid(id:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/AgencySignUp/${id}`);
  }
  updateAgencySignUp(postId: number, updatedData: any) {

    return this.http.put(`http://localhost:3000/AgencySignUp/${postId}`, updatedData); // Send a PUT request to update the post
  }
  AddnewDriver(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/DriverRecords`, data);
  }
  GetDriverDetail(agencyid:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/DriverRecords/?AgencyId=${agencyid}`);
  }
  getDriverRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/DriverRecords`);
  }
  GetDriverDetailById(id:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/DriverRecords/${id}`);
  }
  
  updateDriverDetail(id:any,data:any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/DriverRecords/${id}`,data);
  }
  DelDriverDetail(id:any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/DriverRecords/${id}`);
  }
  OrderAcceptAgency(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/OrderAccepByAgency`, data);
  }
  
  getOrderAcceptAgency(): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`http://localhost:3000/OrderAccepByAgency`);
  }
  getOrderAcceptRecordById(agencyid:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/OrderAccepByAgency/?agencyid=${agencyid}`);
  }
  getOrderAcceptRecordByIdonly(id:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/OrderAccepByAgency/?jobid=${id}`);
  }

  OrderAssignToDriver(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`${this.baseUrl}/OrderAssignToDriver`, data);
  }
  OrderReAssignToDriver(id:any,data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.put<any>(`${this.baseUrl}/OrderAssignToDriver/${id}`, data);
  }
  
  getOrderAssignToDriver(): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/OrderAssignToDriver`);
  }
  getOrderAssignToDriverByid(id:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/OrderAssignToDriver/${id}`);
  }
  getOrderAssignToDriverBydriverId(id:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/OrderAssignToDriver/?driverId=${id}`);
  }
  
  getOrderAssignToDriverByJobId(jobId:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/OrderAssignToDriver/?jobid=${jobId}`);
  }
  manageCargo(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`http://localhost:3000/Tracking`, data);
  }


  updateMangeCargo(trackingId: string, updatedData: any): Observable<any> {
    // Assuming your API endpoint for updating tracking information is '/Tracking'
    // Use PUT method to update an existing entry
    return this.http.put<any>(`http://localhost:3000/Tracking/${trackingId}`, updatedData);
  }
  updateAcceptedOrder( updatedData: any) {
const id=updatedData.id
    return this.http.put(`http://localhost:3000/OrderAccepByAgency/${id}`, updatedData); // Send a PUT request to update the post
  }
      getManageCargoById(TrackingId:any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/Tracking/?trackingId=${TrackingId}`);
  }
  orderCancelReason(){
    return this.http.get<any>(`http://localhost:3000/orderCancelReason`);
  }
  getAdminRecord(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/adminDetails`);
  }
}
