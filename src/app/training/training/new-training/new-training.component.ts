import { JsonpClientBackend } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  selectedId!: string;
  excercises: Excercise[] = [];

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.excercises = this.theTrainingService.getAvailableExcercises();
  }

  onStartTraining(form: NgForm) {
    this.theTrainingService.startTraining(form.value.selectedExcercise);
  }

}
