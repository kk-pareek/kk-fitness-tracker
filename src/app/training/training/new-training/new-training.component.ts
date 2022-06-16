import { JsonpClientBackend } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  selectedId!: string;
  availableExcercises: Excercise[] = [];

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.theTrainingService.fetchAvailableExcercises();
    this.theTrainingService.availableExcercisesChanged.subscribe(availableExcercises => {
      this.availableExcercises = availableExcercises;
    })
  }

  onStartTraining(form: NgForm) {
    this.theTrainingService.startTraining(form.value.selectedExcercise);
  }

}
