import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})

export class PastTrainingsComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'state', 'duration', 'calories'];
  pastTrainingsData = new MatTableDataSource<Excercise>();

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.pastTrainingsData = this.theTrainingService.getPastTrainingsData();
  }

}

