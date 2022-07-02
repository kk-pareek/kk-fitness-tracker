import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training/training.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authStatus = new Subject<boolean>();
  isAuthenticated = false;

  constructor(private router: Router, private fireAuth: AngularFireAuth, private theTrainingService: TrainingService, private theUiService: UiService) { }

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        console.log('user registered successfully!');
        this.isAuthenticated = true;
        this.authStatus.next(this.isAuthenticated);
        this.router.navigate(['/training']);
      } else {

      }
    })
  }

  registerUser(authData: AuthData) {
    this.theUiService.loadingStateChanged.next(true);
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      this.theUiService.loadingStateChanged.next(false);
      this.setCurrentUserInBrowserLocalStorage(authData.email);
    })
    .catch(err => {
      console.error(err);
      this.theUiService.showSnackbar(err.message, 'Close', 10000);
      this.theUiService.loadingStateChanged.next(false);
    });
  }

  login(authData: AuthData) {
    this.theUiService.loadingStateChanged.next(true);
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      this.theUiService.loadingStateChanged.next(false);
      this.setCurrentUserInBrowserLocalStorage(authData.email);
    })
    .catch(err => {
      console.error(err);
      this.theUiService.showSnackbar(err.message, 'Close', 10000);
      this.theUiService.loadingStateChanged.next(false);
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

  setCurrentUserInBrowserLocalStorage(userEmail: string) {
    localStorage.setItem('currentUser', userEmail);
  }

  getCurrentUserFromBrowserLocalStorage() {
    return localStorage.getItem('currentUser');
  }
}
