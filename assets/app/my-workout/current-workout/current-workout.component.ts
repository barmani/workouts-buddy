import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MyWorkoutService } from '../my-workout.service';
import { Exercise } from '../../models/exercise.model';
import { Workout } from '../../models/workout.model';

@Component({
    selector: 'app-current-workout',
    templateUrl: './current-workout.component.html'
})
export class CurrentWorkoutComponent implements OnInit {
  workout: Workout;

  constructor(private myWorkoutService: MyWorkoutService, private router: Router) {}

  ngOnInit() {
    this.workout = this.myWorkoutService.getCurrentWorkout();
  }

  resetWorkout() {
    this.myWorkoutService.clearCurrentWorkout();
    this.router.navigate(['/my-workout/new-workout']);
  }

  swapExercise(event: Exercise) {
    this.myWorkoutService.replaceExercise(event, this.workout.exercises.indexOf(event)).subscribe();
  }
}
