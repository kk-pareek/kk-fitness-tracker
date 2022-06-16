import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderToolbarComponent } from './navigation/header-toolbar/header-toolbar.component';
import { NewTrainingComponent } from './training/training/new-training/new-training.component';
import { CurrentTrainingComponent } from './training/training/current-training/current-training.component';
import { PastTrainingsComponent } from './training/training/past-trainings/past-trainings.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { AuthServiceService } from './auth/auth-service.service';
import { TrainingService } from './training/training/training.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderToolbarComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    AuthServiceService,
    TrainingService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationModalComponent
  ]
})
export class AppModule { }
