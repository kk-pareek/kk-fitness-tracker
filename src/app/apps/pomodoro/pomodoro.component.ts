import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  isLinear = false;
  availableFocusTimes = [15, 25, 50];
  availableBreakTimes = [5, 10, 15];

  firstFormGroup = this.theFormBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this.theFormBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private theFormBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onStartPomodoro(form: any) {

  }

}
