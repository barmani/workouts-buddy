import { Component, OnInit } from '@angular/core';

import { CustomWorkoutService } from './custom-workout.service';
import { Exercise } from '../models/exercise.model';
import { MyWorkoutService } from '../my-workout/my-workout.service';
import { Router } from '@angular/router';
import { Workout } from '../models/workout.model';

import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-custom-workout',
    templateUrl: './custom-workout.component.html'
})
export class CustomWorkoutComponent implements OnInit {
  muscleFields = ['', 'BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'];
  equipmentFields = ['', 'BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'];
  allExercises: Exercise[];
  searchResults: Exercise[];
  customWorkout: Workout = new Workout('custom workout', 'CUSTOM', []);
  noResults: boolean;
  formGroup: FormGroup;
  filteredOptions: Observable<string[]>;
  currentOptions: string[] = [];

  constructor(private customWorkoutService: CustomWorkoutService, private myWorkoutService: MyWorkoutService,
              private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      muscleGroup: new FormControl(),
      equipment: new FormControl(),
      exerciseName: new FormControl
    });
    this.customWorkoutService.getExerciseNames().subscribe((result) => {
      this.allExercises = result.exercises;
      this.allExercises.forEach((exercise) => {
        this.currentOptions.push(exercise.name);
      });
    });
    this.filteredOptions = this.formGroup.get('exerciseName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.onChanges();
  }

  private onChanges() {
    this.formGroup.get('muscleGroup').valueChanges.subscribe((value) => {
      this.reEvaluateOptions();
    });
    this.formGroup.get('equipment').valueChanges.subscribe((value) => {
      this.reEvaluateOptions();
    });
  }

  private reEvaluateOptions() {
    this.currentOptions = [];
    const muscleGroup = this.formGroup.get('muscleGroup').value
                        ? this.formGroup.get('muscleGroup').value
                        : '';
    const equipment = this.formGroup.get('equipment').value
                        ? this.formGroup.get('equipment').value
                        : '';
    this.allExercises.forEach((exercise) => {
      if (exercise.muscle.includes(muscleGroup) && exercise.equipment.includes(equipment)) {
        this.currentOptions.push(exercise.name);
      }
    });
    this.filteredOptions = this.formGroup.get('exerciseName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currentOptions.filter(option => option.toLowerCase().includes(filterValue));
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
        this.noResults = !exercises || exercises.length === 0;
      });
  }

  clearSearch() {
    this.formGroup.reset();
    this.searchResults = [];
  }

  clearWorkout() {
    this.customWorkout.exercises = [];
  }

}
