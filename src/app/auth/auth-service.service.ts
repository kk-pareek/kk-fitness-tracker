import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingService } from '../training/training/training.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authStatus = new Subject<boolean>();
  isAuthenticated = false;

  constructor(private router: Router, private fireAuth: AngularFireAuth, private theTrainingService: TrainingService) { }

  registerUser(authData: AuthData) {
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      this.onAuthSuccess();
      console.log(result);
    })
    .catch(err => {
      console.error(err);
    });
  }

  login(authData: AuthData) {
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      this.onAuthSuccess();
      console.log(result);
    })
    .catch(err => {
      console.error(err);
    })
  }

  logout() {
    this.fireAuth.signOut();
    this.isAuthenticated = false;
    this.authStatus.next(this.isAuthenticated);
    this.theTrainingService.cancelFirebaseSubscriptions();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  onAuthSuccess() {
    console.log('user registered successfully!');
    this.isAuthenticated = true;
    this.authStatus.next(this.isAuthenticated);
    this.router.navigate(['/training']);
  }
}
