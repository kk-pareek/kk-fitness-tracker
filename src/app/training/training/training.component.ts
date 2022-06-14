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
  excerciseChangedSubscription!: Subscription;

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.excerciseChangedSubscription = this.theTrainingService.excerciseChanged.subscribe(excercise => {
      this.ongoingTraining = excercise != null ? true : false;
    })
  }

  ngOnDestroy() {
      this.excerciseChangedSubscription.unsubscribe();
  }

}
