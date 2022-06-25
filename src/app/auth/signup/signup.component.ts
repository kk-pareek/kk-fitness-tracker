import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { UiService } from 'src/app/shared/ui.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate = new Date();
  isLoading = false;

  signUpForm = this.theFormBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth: ['', [Validators.required]]
  });

  constructor(
    private theFormBuilder: FormBuilder,
    private theDateAdapter: DateAdapter<Date>,
    private theAuthService: AuthServiceService,
    private theUiService: UiService
  ) {
      this.theDateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.theUiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState;
    })
  }

  onSignUp() {
    this.theAuthService.registerUser(
      {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      }
    );
    console.log(this.signUpForm.value);
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get dateOfBirth() {
    return this.signUpForm.get('dateOfBirth');
  }

}
