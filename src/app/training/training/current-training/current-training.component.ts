import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  trainingProgress = 0;
  trainingProgressInterval: any;
  matDialogConfig: MatDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '250px',
    height: '',
    position: {
      top: '50vh',
      left: '50vw'
    },
    panelClass: 'makeItMiddle',
  }

  constructor(private diaglog: MatDialog) { }

  ngOnInit(): void {
    this.trainingProgressInterval = setInterval(() => {
      if (this.trainingProgress < 100) {
        this.trainingProgress += 5;
      } else {
        clearInterval(this.trainingProgressInterval);
      }
    }, 1000)
  }

  stopTraining() {
    clearInterval(this.trainingProgressInterval);
  }

  onStopTraining() {
    this.diaglog.open(StopTrainingComponent, this.matDialogConfig);
    // this.stopTraining();
  }

}


