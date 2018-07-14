import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MyWorkoutService } from '../my-workout/my-workout.service';
import { SavedWorkoutsService } from './saved-workouts.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-saved-workout',
  templateUrl: './saved-workouts.component.html'
})
export class SavedWorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  constructor(private savedWorkoutsService: SavedWorkoutsService,
              private myWorkoutService: MyWorkoutService,
              private router: Router) {}

  ngOnInit() {
    this.savedWorkoutsService.getWorkouts().subscribe((workouts) => {
      workouts.forEach((workout) => {
        let exercises: Exercise[] = [];
        workout.exercises.forEach((exercise) => {
          exercises.push(new Exercise(exercise.name, exercise.description, exercise.muscle,
                                      exercise.equipment, exercise._id, exercise.video));
        });
        this.workouts.push(new Workout(workout.name, workout.difficulty, exercises));
      });
    });
  }

  getExerciseMuscleGroups(workout: Workout) {
    let uniqueExercises = [];
    let retStr = '';
    workout.exercises.forEach((exercise) => {
      if (!uniqueExercises.includes(exercise.muscle)) {
        if (uniqueExercises.length > 0) {
          retStr += ', ' + exercise.muscle
        } else {
          retStr += exercise.muscle;
        }
        uniqueExercises.push(exercise.muscle);
      }
    });
    return retStr;
  }

  makeCurrentWorkout(workout: Workout) {
    this.myWorkoutService.setCurrentWorkout(workout);
    this.router.navigate(['/my-workout/current-workout']);
  }

  removeWorkout(workout: Workout) {
    
  }
}
