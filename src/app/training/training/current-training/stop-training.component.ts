import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-stop-training',
  template: `
  <h1 mat-dialog-title>Are you sure?</h1>
  <div mat-dialog-content>
    <p>What's your favorite animal?</p>
  </div>
  <div mat-dialog-actions>
      <button [mat-dialog-close]="false" mat-raised-button color="accent">No</button>
      <button [mat-dialog-close]="true" mat-raised-button color="primary">Yes</button>
  </div>
  `
})
export class StopTrainingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
