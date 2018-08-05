import { Component, OnInit } from '@angular/core';

import { CustomWorkoutService } from '../services/custom-workout.service';
import { Exercise } from '../models/exercise.model';
import { MyWorkoutService } from '../services/my-workout.service';
import { Router } from '@angular/router';
import { Workout } from '../models/workout.model';

import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-custom-workout',
    templateUrl: './custom-workout.component.html',
    styleUrls: ['./custom-workout.component.css']
})
export class CustomWorkoutComponent implements OnInit {
  muscleFields = ['', 'BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'];
  equipmentFields = ['', 'BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'];
  allExercises: Exercise[];
  searchResults: Exercise[] = [];
  displayedSearchResults: Exercise[] = [];
  customWorkout: Workout = new Workout('custom workout', 'CUSTOM', []);
  noResults: boolean;
  formGroup: FormGroup;
  filteredOptions: Observable<string[]>;
  currentOptions: string[] = [];

  // pagination settings
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

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
      if (exercise.muscle.includes(muscleGroup)
            && exercise.equipment.includes(equipment)
            && !this.customWorkoutIncludesExercise(exercise.name)) {
        this.currentOptions.push(exercise.name);
      }
    });
    this.filteredOptions = this.formGroup.get('exerciseName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private resetDisplayedSearchResults(removedIndex) {
    if (removedIndex != this.searchResults.length - 1) {
      //  add the first result on the next page to this page
      this.displayedSearchResults.push(this.searchResults[(Math.floor(removedIndex / 10)) * 10 + 9]);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currentOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  addToWorkout(exercise: Exercise) {
    if (!this.customWorkout.exercises.includes(exercise)) {
      this.customWorkout.exercises.push(exercise);
      this.searchResults.forEach((result) => {
        if (exercise.name === result.name && exercise.muscle === result.muscle) {
          const searchResultIndex = this.searchResults.indexOf(result);
          this.searchResults.splice(searchResultIndex, 1);
          this.displayedSearchResults.splice(this.displayedSearchResults.indexOf(result), 1);
          this.reEvaluateOptions(); // make sure this exercise is not included in autocomplete suggestions
          this.resetDisplayedSearchResults(searchResultIndex);
        }
      });
    }
  }

  remove(exercise: Exercise) {
    this.customWorkout.exercises.splice(this.customWorkout.exercises.indexOf(exercise), 1);
  }

  saveWorkout() {
    this.myWorkoutService.setCurrentWorkout(this.customWorkout);
    this.router.navigate(['/my-workout/current-workout']);
  }

  search() {
    this.searchResults = [];
    let usedExerciseNames = [];
    // if any exercises are in current workout, do not include them in search results
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
        // the search results displayed in pagination
        this.displayedSearchResults = [];
        this.noResults = !exercises || exercises.length === 0;

        // adjust pagination settings
        this.length = this.searchResults.length;
        if (this.searchResults.length > this.pageSize) {
          for (let i = 0; i < this.pageSize; i++) {
            this.displayedSearchResults.push(this.searchResults[i]);
          }
        } else {
          this.searchResults.forEach((result) => {
            this.displayedSearchResults.push(result);
          });
        }
      });
  }

  pageUpdate(event) {
    if (event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
      this.displayedSearchResults = [];
      for (let i = 0; i < this.pageSize; i++) {
        if (this.searchResults.length > i) { // make sure to not go past array size
          this.displayedSearchResults.push(this.searchResults[i])
        }
      }
    } else if (event.pageIndex != event.previousPageIndex) {
      this.displayedSearchResults = [];
      for (let i = event.pageIndex * this.pageSize; i < (event.pageIndex + 1) * this.pageSize; i++) {
        if (this.searchResults.length > i) { // make sure to not go past array size
          this.displayedSearchResults.push(this.searchResults[i])
        }
      }
    }
  }

  clearSearch() {
    this.formGroup.reset();
    this.searchResults = [];
  }

  clearWorkout() {
    this.customWorkout.exercises = [];
  }

  customWorkoutIncludesExercise(exerciseName: string) {
    let retVal: boolean = false;
    this.customWorkout.exercises.forEach((exercise, index) => {
      if (exercise.name === exerciseName) {
        retVal = true;
      }
    });
    return retVal;
  }

}
