import { Component, OnInit } from '@angular/core';

import { MyWorkoutService } from '../my-workout.service';

@Component({
    selector: 'app-current-workout',
    templateUrl: './current-workout.component.html'
})
export class CurrentWorkoutComponent implements OnInit {


  constructor(private myWorkoutService: MyWorkoutService) {}

  ngOnInit() {
    console.log(this.myWorkoutService.getCurrentWorkout());
  }
}
