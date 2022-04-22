import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate = new Date();

  signUpForm = this.theFormBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth: ['', [Validators.required]]
  });

  constructor(
    private theFormBuilder: FormBuilder,
    private theDateAdapter: DateAdapter<Date>) {
      this.theDateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSignUp() {
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
