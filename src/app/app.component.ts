import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Cargo-Services';
  constructor(private commonService:CommonService){}
  darkMode$ = this.commonService.darkMode$;
}
