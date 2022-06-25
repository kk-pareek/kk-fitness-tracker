import { JsonpClientBackend } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  selectedId!: string;
  availableExcercises: Excercise[] = [];
  availableExcercisesChangedSubscription!: Subscription;
  isAvailableExcercisesLoading = false;

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.availableExcercisesChangedSubscription = this.theTrainingService.availableExcercisesChanged.subscribe(availableExcercises => {
      this.availableExcercises = availableExcercises;
    });
    this.theTrainingService.fetchAvailableExcercises();
  }

  onStartTraining(form: NgForm) {
    this.theTrainingService.startTraining(form.value.selectedExcercise);
  }

  ngOnDestroy() {
      this.availableExcercisesChangedSubscription.unsubscribe();
  }

}
