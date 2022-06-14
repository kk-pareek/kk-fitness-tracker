import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  trainingProgress = 0;
  trainingProgressInterval: any;

  constructor(private diaglog: MatDialog, private theTrainingService: TrainingService) { }

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
        this.theTrainingService.onCancelExcercise(this.trainingProgress);
      } else {
        this.startTimer();
      }
    })
  }

  startTimer() {
    const step = (this.theTrainingService.getOngoingTraining().duration / 100 ) * 1000;
    this.trainingProgressInterval = setInterval(() => {
      if (this.trainingProgress < 100) {
        this.trainingProgress += 1;
      } else {
        this.theTrainingService.onCompleteExcercise();
        clearInterval(this.trainingProgressInterval);
      }
    }, step)
  }

  stopTimer() {
    clearInterval(this.trainingProgressInterval);
  }

}


