import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { AgencyCommonService } from '../../agency-common.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: any;
  vehicleTypes: any;
  filteredVehicleTypes: any
searchText: any;

  constructor(public commonService:AgencyCommonService,private router:Router , private coreService:CoreService) { }

  ngOnInit() {
    
    this.commonService.getAllJobs()
    this.commonService.AllJobs$.subscribe(jobs =>
      this.jobs = jobs
    )

    console.log(   this.jobs);
    
    this.commonService.searchSubject.subscribe((searchString:any)=>{
      this.searchText = searchString;
    });
  }
  searchVehical(searchText:any){
    this.commonService.getSearchString(searchText);
  }

  transform(books:any[],searchText:any):any {
    if(!searchText){
      return books;
    }
    
    return books.filter((book:any)=>{
      return book.SelectedVehicle.toLowerCase().includes(searchText.toLowerCase());
    });
  }
  moreInfo(id:string){
this.commonService.GetCurentJob(id)
this.router.navigate(['/more-info'])
  }
  sortByVehicleType(order: string) {
    if (order === 'Ascending') {
      this.jobs.sort((a:any, b:any) => a.SelectedVehicle.localeCompare(b.SelectedVehicle));
    } else if (order === 'Descending') {
      this.jobs.sort((a:any, b:any) => b.SelectedVehicle.localeCompare(a.SelectedVehicle));
    }
  }

  sortByDate(order: string) {
    if (order === 'Ascending') {
      this.jobs.sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (order === 'Descending') {
      this.jobs.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  sortByPrice(order: string) {
    if (order === 'Ascending') {
      this.jobs.sort((a:any, b:any) => a.totalVechialPrice - b.totalVechialPrice);
    } else if (order === 'Descending') {
      this.jobs.sort((a:any, b:any) => b.totalVechialPrice - a.totalVechialPrice);
    }
  }
  sortByWeight(order: string) {
    if (order === 'Ascending') {
      this.jobs.sort((a:any, b:any) => a.estimatedWeight - b.estimatedWeight);
    } else if (order === 'Descending') {
      this.jobs.sort((a:any, b:any) => b.estimatedWeight - a.estimatedWeight);
    }
  }
}

