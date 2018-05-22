import { Component, OnInit } from '@angular/core';

import { MyWorkoutService } from './my-workout.service';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-my-workout',
  template: `
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
  `
})
export class MyWorkoutComponent implements OnInit {

  constructor(private myWorkoutService: MyWorkoutService) {}

  ngOnInit() {
    if (sessionStorage.getItem('currentWorkout')) {
      let savedWorkout: Workout = JSON.parse(sessionStorage.getItem('currentWorkout'));
      this.myWorkoutService.setCurrentWorkout(savedWorkout);
    }
  }

}
