import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { AuthServiceService } from '../auth-service.service';
import { UiService } from '../../shared/ui.service';

import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}]
})
export class LoginComponent implements OnInit {

  maxDate = new Date();
  tooltipPosition = new FormControl('above');
  isLoading = false;

  loginForm = this.theFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
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

  onLogin() {
    console.log(this.loginForm.value);
    this.theAuthService.login(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
