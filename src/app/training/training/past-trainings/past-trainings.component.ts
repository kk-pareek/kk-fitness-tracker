import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})

export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['position','date', 'name', 'state', 'duration', 'calories'];
  pastTrainingsData = new MatTableDataSource();
  pastExcercisesChangedSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.pastExcercisesChangedSubscription = this.theTrainingService.pastExcercisesChanged.subscribe((pastExcercises: any) => {
      this.pastTrainingsData = new MatTableDataSource(pastExcercises);
      this.pastTrainingsData.sort = this.sort;
      this.pastTrainingsData.paginator = this.paginator;
    })
    this.theTrainingService.fetchPastExcercises();
  }

  ngAfterViewInit() {
  }

  applyFilter(event: any) {
    const filterText = event.target.value;
    this.pastTrainingsData.filter = filterText.trim().toLowerCase();
  }

  ngOnDestroy(): void {
      this.pastExcercisesChangedSubscription.unsubscribe();
  }

}

