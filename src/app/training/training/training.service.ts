import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { Excercise } from './excercise.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  availableExcercisesChanged = new Subject<Excercise[]>();
  ongoingExcerciseChanged = new Subject<Excercise>();
  pastExcercisesChanged = new Subject<Excercise[]>();

  ongoingExcercise!: Excercise;
  pastExcercises: Excercise[] | any = [];
  availableExcercises: Excercise[] = [];
  firebaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) { }

  getAvailableExcercises() {
    return this.availableExcercises.slice();
  }

  startTraining(selectedExcerciseName: string) {
    this.ongoingExcercise = this.availableExcercises.find(excercise => excercise.name === selectedExcerciseName)!;
    this.ongoingExcerciseChanged.next(this.ongoingExcercise);
  }

  getOngoingTraining() {
    return { ...this.ongoingExcercise };
  }

  onCompleteExcercise() {
    this.db.collection('finishedExcercises').add({
      ...this.ongoingExcercise,
      date: new Date,
      state: 'Completed',
      userId: this.getCurrentUserFromBrowserLocalStorage()
    });
    this.ongoingExcercise = null!;
    this.ongoingExcerciseChanged.next(this.ongoingExcercise);
    console.log(this.pastExcercises)
  }

  onCancelExcercise(progress: number) {
    this.db.collection('finishedExcercises').add({
      ...this.ongoingExcercise,
      date: new Date,
      duration: this.ongoingExcercise.duration * (progress / 100),
      calories: this.ongoingExcercise.calories * (progress / 100),
      state: 'Cancelled',
      userId: this.getCurrentUserFromBrowserLocalStorage()
    });
    this.ongoingExcercise = null!;
    this.ongoingExcerciseChanged.next(this.ongoingExcercise);
    console.log(this.pastExcercises)
  }

  fetchAvailableExcercises() {
    this.firebaseSubscriptions.push(
      this.db.collection('availableExcercises').snapshotChanges().pipe(map((responseArray: any) => {
        return responseArray.map((responseArrayElement: any) => {
          return {
            id: responseArrayElement.payload.doc.id,
            name: responseArrayElement.payload.doc.data().name,
            duration: responseArrayElement.payload.doc.data().duration,
            calories: responseArrayElement.payload.doc.data().calories
          }
        })
      })).subscribe(availableExcercises => {
        this.availableExcercises = availableExcercises;
        this.availableExcercisesChanged.next(this.availableExcercises);
      })
    );
  }

  fetchPastExcercises() {
    this.firebaseSubscriptions.push(
      this.db.collection('finishedExcercises').valueChanges().subscribe(pastExcercises => {
        this.pastExcercises = pastExcercises.filter((excercise: any) => {
          return excercise.userId === this.getCurrentUserFromBrowserLocalStorage();
        });
        this.pastExcercisesChanged.next(this.pastExcercises);
      })
    );
  }

  cancelFirebaseSubscriptions() {
    this.firebaseSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getCurrentUserFromBrowserLocalStorage() {
    return localStorage.getItem('currentUser');
  }
}
