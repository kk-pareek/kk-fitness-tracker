import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Excercise } from './excercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanged = new Subject<Excercise>();
  ongoingExcercise!: Excercise;

  private availableExcercises: Excercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 60, calories: 8 },
    { id: 'leg-raises', name: 'Leg Raises', duration: 30, calories: 8 },
    { id: 'burpees', name: 'Burpees', duration: 30, calories: 8 },
    { id: 'pushups', name: 'Pushups', duration: 60, calories: 8 }
  ];

  constructor() { }

  getAvailableExcercises() {
    return this.availableExcercises.slice();
  }

  startTraining(selectedId: string) {
    this.ongoingExcercise = this.availableExcercises.find(excercise =>  excercise.id === selectedId)!;
    this.excerciseChanged.next(this.ongoingExcercise);
  }

  getOngoingTraining() {
    return { ...this.ongoingExcercise };
  }
}
