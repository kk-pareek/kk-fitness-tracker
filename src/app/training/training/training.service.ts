import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Excercise } from './excercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanged = new Subject<Excercise>();
  ongoingExcercise!: Excercise;
  pastExcercises: Excercise[] = [];

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

  onCompleteExcercise() {
    this.pastExcercises.push({
      ...this.ongoingExcercise,
      date: new Date,
      state: 'completed'
    });
    this.ongoingExcercise = null!;
    this.excerciseChanged.next(this.ongoingExcercise);
    console.log(this.pastExcercises)
  }

  onCancelExcercise(progress: number) {
    this.pastExcercises.push({
      ...this.ongoingExcercise,
      date: new Date,
      duration: this.ongoingExcercise.duration * (progress / 100),
      calories: this.ongoingExcercise.calories * (progress / 100),
      state: 'cancelled'
    });
    this.ongoingExcercise = null!;
    this.excerciseChanged.next(this.ongoingExcercise);
    console.log(this.pastExcercises)
  }
}
