import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fitness-tracker';

  constructor(private theAuthService: AuthServiceService) {}

  ngOnInit(): void {
    this.theAuthService.initAuthListener();
  }
}
