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
    return this.http.post<any>(`${this.baseUrl}/usersBookingRecord`, data);
  }
  updateuserOrder( updatedData: any) {
    const id=updatedData._id
        return this.http.put(`${this.baseUrl}/usersBookingRecord/${id}`, updatedData); // Send a PUT request to update the post
      }

  getUserBookingReacod(userId:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/usersBookingRecord/?userId=${userId}`);
  }
  
  updateSignUp(postId: number, updatedData: any) {

    return this.http.put(`${this.baseUrl}/signup/${postId}`, updatedData); // Send a PUT request to update the post
  }
  getUserBookingReacodByID(Id:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/usersBookingRecord/${Id}`);
  }
  getAllUserBookingReacod(): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/usersBookingRecord`);
  }

  signupUserRecord(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }

  getsignupUserRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/signup`);
  }
  getsignupUserRecordById(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/signup/${id}`);
  }
  updateSignupUserRecordById(id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/signup/${id}`,data);
  }
  delsignupUserRecordById(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/signup/${id}`);
  }
  
  createUserBookingcancelReacod(data: any): Observable<any> {

    
    return this.http.post<any>(`${this.baseUrl}/cancelOrder`, data);
  }
  getUserBookingCanceldRecod(id:any): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}/cancelOrder/?userId=${id}`);
  }
  getCanceldRecod(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}/cancelOrder`);
  }
  getUserBookingReacodtocancel(id:any): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}/usersBookingRecord/${id}`);
  }
  deleteUserRecord(id: any): Observable<any> {
 
    
    return this.http.delete<any>(`${this.baseUrl}/usersBookingRecord/${id}`);
  }
  deletecancelRecord(id: any): Observable<any> {
 
    
    return this.http.delete<any>(`${this.baseUrl}/cancelOrder/${id}`);
  }
  getVehicleTypesRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vehicletype`);
  }
  getGoodsTypesRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/goodsTypes`);
  }
  getHelperCountRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/helper`);
  }
  getPickUpTimeRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pickupTime`);
  }
  signupAgencyRecord(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`${this.baseUrl}/AgencySignUp`, data);
  }
  getsignupAgencyRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/AgencySignUp`);
  }
  getsignupAgencyRecordbyid(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/AgencySignUp/${id}`);
  }
  updateAgencySignUp(postId: number, updatedData: any) {

    return this.http.put(`${this.baseUrl}/AgencySignUp/${postId}`, updatedData); // Send a PUT request to update the post
  }
  delsignupAgencyRecordById(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/AgencySignUp/${id}`);
  }
  AddnewDriver(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`${this.baseUrl}/DriverRecords`, data);
  }
  GetDriverDetail(agencyid:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/DriverRecords/?AgencyId=${agencyid}`);
  }
  getDriverRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/DriverRecords`);
  }
  GetDriverDetailById(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/DriverRecords/${id}`);
  }
  
  updateDriverDetail(id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/DriverRecords/${id}`,data);
  }
  DelDriverDetail(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/DriverRecords/${id}`);
  }
  OrderAcceptAgency(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`${this.baseUrl}/OrderAccepByAgency`, data);
  }
  
  getOrderAcceptAgency(): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/OrderAccepByAgency`);
  }
  getOrderAcceptRecordById(agencyid:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/OrderAccepByAgency/?agencyid=${agencyid}`);
  }
  getOrderAcceptRecordByIdonly(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/OrderAccepByAgency/?jobid=${id}`);
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
    return this.http.get<any>(`${this.baseUrl}/OrderAssignToDriver?driverId=${id}`);
  }
  
  getOrderAssignToDriverByJobId(jobId:any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.get<any>(`${this.baseUrl}/OrderAssignToDriver/?jobid=${jobId}`);
  }
  manageCargo(data: any): Observable<any> {
    // Assuming you want to send data to the 'usersBookingRecord' endpoint
    return this.http.post<any>(`${this.baseUrl}/CargoTracking`, data);
  }


  updateMangeCargo(trackingId: string, updatedData: any): Observable<any> {
    // Assuming your API endpoint for updating tracking information is '/Tracking'
    // Use PUT method to update an existing entry
    return this.http.put<any>(`${this.baseUrl}/CargoTracking/${trackingId}`, updatedData);
  }
  updateAcceptedOrder( updatedData: any) {
const id=updatedData._id
    return this.http.put(`${this.baseUrl}/OrderAccepByAgency/${id}`, updatedData); // Send a PUT request to update the post
  }
      getManageCargoById(TrackingId:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/CargoTracking?trackingId=${TrackingId}`);
  }
  orderCancelReason(){
    return this.http.get<any>(`${this.baseUrl}/orderCancelReason`);
  }
  getAdminRecord(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/adminDetails`);
  }
  postAdminRecord(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/adminDetails`,data);
  }
  getAdminRecordByID(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/adminDetails/${id}`);
  }
  delAdminRecordByID(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/adminDetails/${id}`);
  }
  updateAdminRecordByID(id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/adminDetails/${id}`,data);
  }
 

 
}
