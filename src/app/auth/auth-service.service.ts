import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authStatus = new Subject<boolean>();
  private user!: User;

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.onAuthSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.onAuthSuccess();
  }

  logout() {
    this.user = null as any;
    this.authStatus.next(false);
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null;
  }

  onAuthSuccess() {
    console.log('user registered successfully!');
    this.authStatus.next(true);
    this.router.navigate(['/training']);
  }
}
