import { Component, OnInit } from '@angular/core';

import { CustomWorkoutService } from './custom-workout.service';
import { Exercise } from '../models/exercise.model';
import { MyWorkoutService } from '../my-workout/my-workout.service';
import { Router } from '@angular/router';
import { Workout } from '../models/workout.model';

import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-custom-workout',
    templateUrl: './custom-workout.component.html'
})
export class CustomWorkoutComponent implements OnInit {
  muscleFields = ['', 'BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'];
  equipmentFields = ['', 'BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'];
  searchResults: Exercise[];
  customWorkout: Workout = new Workout('custom workout', 'CUSTOM', []);

  formGroup: FormGroup;

  constructor(private customWorkoutService: CustomWorkoutService, private myWorkoutService: MyWorkoutService,
              private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      muscleGroup: new FormControl(),
      equipment: new FormControl(),
      exerciseName: new FormControl()
    });
  }

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

  search() {
    let usedExerciseNames = [];
    this.customWorkout.exercises.forEach((exercise) => {
      usedExerciseNames.push(exercise.name);
    });
    const muscle = this.formGroup.value.muscleGroup ? this.formGroup.value.muscleGroup : '';
    const equipment = this.formGroup.value.equipment ? this.formGroup.value.equipment : '';
    const name = this.formGroup.value.exerciseName ? this.formGroup.value.exerciseName : '';
    const searchParams = { muscle: muscle,
                         equipment: equipment,
                         name: name,
                         usedExerciseNames: usedExerciseNames
                       };
    this.customWorkoutService.exerciseSearch(searchParams)
      .subscribe((exercises: Exercise[]) => {
        this.searchResults = exercises;
      });
  }

}
