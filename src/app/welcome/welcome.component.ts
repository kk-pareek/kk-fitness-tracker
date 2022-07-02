import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentQuote!: string;
  quotesCollection = [
    "Don't stop pal!!",
    "Pain is temporary!!",
    "Hustle each moment!!",
    "Make it happen!!",
    "You are the one!!",
    "Live, don't just exist!!"
  ]

  constructor(private theRouter: Router) { }

  ngOnInit(): void {
    this.currentQuote = this.quotesCollection[Math.floor(this.getRandomIndex(1, 5))-1];
  }

  getRandomIndex(start: number, end: number) {
    return Math.random() * (end - start) + start;
  }

  routeToSignUp() {
    this.theRouter.navigate(['/signup']);
  }
}
