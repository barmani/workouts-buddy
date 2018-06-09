import { Component, OnInit } from '@angular/core';

import { SavedWorkoutsService } from './saved-workouts.service';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-saved-workout',
  templateUrl: './saved-workouts.component.html'
})
export class SavedWorkoutsComponent implements OnInit {
  workouts: Workout[];
  constructor(private savedWorkoutsService: SavedWorkoutsService) {}

  ngOnInit() {
    this.savedWorkoutsService.getWorkouts().subscribe();
    //   .subscribe((workouts: Workouts[]) => {
    //     this.workouts = workouts;
    //   });
  }

}
