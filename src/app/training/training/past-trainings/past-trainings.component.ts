import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})

export class PastTrainingsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position','date', 'name', 'state', 'duration', 'calories'];
  pastTrainingsData = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private theTrainingService: TrainingService) { }

  ngOnInit(): void {
    this.pastTrainingsData = new MatTableDataSource(this.theTrainingService.getPastTrainingsData());
  }

  ngAfterViewInit() {
    this.pastTrainingsData.sort = this.sort;
    this.pastTrainingsData.paginator = this.paginator;
  }

  applyFilter(event: any) {
    const filterText = event.target.value;
    this.pastTrainingsData.filter = filterText.trim().toLowerCase();
  }

}

