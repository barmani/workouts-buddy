import { Component } from '@angular/core';

import { CustomWorkoutService } from './custom-workout.service';
import { Exercise } from '../models/exercise.model';
import { MyWorkoutService } from '../my-workout/my-workout.service';
import { Router } from '@angular/router';
import { Workout } from '../models/workout.model';

import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-custom-workout',
    templateUrl: './custom-workout.component.html'
})
export class CustomWorkoutComponent {
  muscleFields = ['', 'BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'];
  equipmentFields = ['', 'BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'];
  searchResults: Exercise[];
  customWorkout: Workout = new Workout('custom workout', 'CUSTOM', []);

  constructor(private customWorkoutService: CustomWorkoutService, private myWorkoutService: MyWorkoutService,
              private router: Router) {}

  addToWorkout(exercise: Exercise) {
    this.customWorkout.exercises.push(exercise);
    this.searchResults.forEach((result) => {
      if (exercise.name === result.name && exercise.muscle === result.muscle) {
        this.searchResults.splice(this.searchResults.indexOf(result), 1);
      }
    });
  }

  remove(exercise: Exercise) {
    this.customWorkout.exercises.splice(this.customWorkout.exercises.indexOf(exercise), 1);
  }

  saveWorkout() {
    this.myWorkoutService.setCurrentWorkout(this.customWorkout);
    this.router.navigate(['/my-workout/current-workout']);
  }

  search(form: NgForm) {
    let usedExerciseNames = [];
    this.customWorkout.exercises.forEach((exercise) => {
      usedExerciseNames.push(exercise.name);
    });
    const searchParams = { muscle: form.value['muscle-groups'],
                         equipment: form.value['equipment-options'],
                         name: form.value['name-search'],
                         usedExerciseNames: usedExerciseNames
                       };
    this.customWorkoutService.exerciseSearch(searchParams)
      .subscribe((exercises: Exercise[]) => {
        this.searchResults = exercises;
      });
  }

}
