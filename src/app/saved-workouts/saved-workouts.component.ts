import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
  displayedWorkouts: Workout[] = [];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(private savedWorkoutsService: SavedWorkoutsService,
              private myWorkoutService: MyWorkoutService,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.savedWorkoutsService.getWorkouts().subscribe((workouts) => {
      workouts.forEach((workout) => {
        let exercises: Exercise[] = [];
        workout.exercises.forEach((exercise) => {
          exercises.push(new Exercise(exercise.name, exercise.description, exercise.muscle,
                                      exercise.equipment, exercise._id, exercise.video));
        });
        this.workouts.push(new Workout(workout.name, workout.difficulty, exercises, workout._id));
      });
      this.length = this.workouts.length;
      if (this.workouts.length > this.pageSize) {
        for (let i = 0; i < this.pageSize; i++) {
          this.displayedWorkouts.push(this.workouts[i]);
        }
      } else {
        this.workouts.forEach((workout) => {
          this.displayedWorkouts.push(workout);
        });
      }
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
    this.savedWorkoutsService.removeWorkout(workout._id).subscribe((result) => {
      this.workouts.splice(this.workouts.indexOf(workout), 1);
      this.length--;
      setTimeout(() => {
        this.snackBar.open('Successfully deleted ' + workout.name, 'Dismiss', {
          duration: 7000
        });
      }, 250);
    });
  }

  pageUpdate(event) {
    if (event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
      this.displayedWorkouts = [];
      for (let i = 0; i < this.pageSize; i++) {
        if (this.workouts.length > i) { // make sure to not go past array size
          this.displayedWorkouts.push(this.workouts[i])
        }
      }
    } else if (event.pageIndex != event.previousPageIndex) {
      this.displayedWorkouts = [];
      for (let i = event.pageIndex * this.pageSize; i < (event.pageIndex + 1) * this.pageSize; i++) {
        if (this.workouts.length > i) { // make sure to not go past array size
          this.displayedWorkouts.push(this.workouts[i])
        }
      }
    }
  }
}
