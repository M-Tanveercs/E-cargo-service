import { Injectable, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyCommonService implements OnInit {
data: any;

private JobjsRecord = new BehaviorSubject({});
AllJobs$ = this.JobjsRecord.asObservable();
private CurentJobRecord = new BehaviorSubject({});
CurentJob$ = this.CurentJobRecord.asObservable();
  curentCartdata: any;
  searchText: any;
  searchSubject = new Subject();
constructor(private coreservice:CoreService) { }

ngOnInit(): void {
  
   
}
getAllJobs(){
  this.coreservice.getAllUserBookingReacod().subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.data = response;
        this.JobjsRecord.next(response);
    console.log(this.data);
      } else {

      }
    },
    (error) => {
      console.error('Error fetching data:', error);
     
      
    }
  );


}
getSearchString(searchText:any){
  this.searchText = searchText;
  console.log(this.searchText);
  this.searchSubject.next(this.searchText);
}
GetCurentJob(id:string){
  this.coreservice.getUserBookingReacodByID(id).subscribe(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        this.curentCartdata = response;
        this.CurentJobRecord.next(response);
    console.log(this.curentCartdata);
      } else {

      }
    },
    (error) => {
      console.error('Error fetching data:', error);
     
      
    }
  );

}
}
