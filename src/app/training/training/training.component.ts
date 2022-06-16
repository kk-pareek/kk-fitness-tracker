import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  ongoingExcerciseChangedSubscription!: Subscription;

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.ongoingExcerciseChangedSubscription = this.theTrainingService.ongoingExcerciseChanged.subscribe(excercise => {
      this.ongoingTraining = excercise != null ? true : false;
    })
  }

  ngOnDestroy() {
      this.ongoingExcerciseChangedSubscription.unsubscribe();
  }

}
