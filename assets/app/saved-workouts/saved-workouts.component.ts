import { Component, OnInit } from '@angular/core';

import { SavedWorkoutsService } from './saved-workouts.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-saved-workout',
  templateUrl: './saved-workouts.component.html'
})
export class SavedWorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  constructor(private savedWorkoutsService: SavedWorkoutsService) {}

  ngOnInit() {
    this.savedWorkoutsService.getWorkouts().subscribe((workouts) => {
      workouts.forEach((workout) => {
        let exercises: Exercise[] = [];
        workout.exercises.forEach((exercise) => {
          exercises.push(new Exercise(exercise.name, exercise.description, exercise.muscle,
                                      exercise.equipment, exercise.video));
        });
        this.workouts.push(new Workout(workout.name, workout.difficulty, exercises));
      });
    });
  }

}
