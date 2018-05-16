import { Component, OnInit } from '@angular/core';

import { MyWorkoutService } from '../my-workout.service';
import { Workout } from '../../models/workout.model';

@Component({
    selector: 'app-current-workout',
    templateUrl: './current-workout.component.html'
})
export class CurrentWorkoutComponent implements OnInit {
  workout: Workout;

  constructor(private myWorkoutService: MyWorkoutService) {}

  ngOnInit() {
    this.workout = this.myWorkoutService.getCurrentWorkout();
  }
}
