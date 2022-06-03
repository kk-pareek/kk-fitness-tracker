import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  trainingProgress = 0;
  trainingProgressInterval: any;

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
    this.diaglog.open(ConfirmationModalComponent, {
      data: {
        confirmationHeader: 'Are you sure to exit?',
        confirmationMessage: `You already got ${this.trainingProgress}%!`,
      }
    });
    // this.stopTraining();
  }

}


