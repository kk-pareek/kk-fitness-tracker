import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() exitTraining = new EventEmitter;

  trainingProgress = 0;
  trainingProgressInterval: any;

  constructor(private diaglog: MatDialog) { }

  ngOnInit(): void {
    this.startTraining();
  }

  startTraining() {
    this.startTimer();
  }
  
  stopTraining() {
    this.stopTimer();
  }

  onStopTraining() {
    this.stopTraining();
    this.showConfirmModal();
  }

  showConfirmModal() {
    const dialogRef = this.diaglog.open(ConfirmationModalComponent, {
      data: {
        confirmationHeader: 'Are you sure to exit?',
        confirmationMessage: `You already got ${this.trainingProgress}%!`,
        rightButtonText: 'Yes',
        leftButtonText: 'No'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exitTraining.emit();
      } else {
        this.startTimer();
      }
    })
  }

  startTimer() {
    this.trainingProgressInterval = setInterval(() => {
      if (this.trainingProgress < 100) {
        this.trainingProgress += 5;
      } else {
        clearInterval(this.trainingProgressInterval);
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.trainingProgressInterval);
  }

}


