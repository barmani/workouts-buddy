import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";

import { ChangeExerciseDialogComponent } from "../change-exercise-dialog/change-exercise-dialog.component";
import { MyWorkoutService } from '../my-workout.service';
import { Exercise } from '../../models/exercise.model';
import { LoginSignupService } from '../../login-signup/login-signup.service';
import { SaveWorkoutDialogComponent } from '../save-workout-dialog.component';
import { SavedWorkoutsService } from '../../saved-workouts/saved-workouts.service';
import { Workout } from '../../models/workout.model';

@Component({
    selector: 'app-current-workout',
    templateUrl: './current-workout.component.html'
})
export class CurrentWorkoutComponent implements OnInit {
  workout: Workout;
  isLoggedIn: boolean;
  subscription: Subscription;
  userId: string = localStorage.getItem('userId');
  username: string;

  largeMuscles = ['CHEST', 'BACK', 'LEGS'];
  smallMuscles = ['BICEPS', 'TRICEPS', 'SHOULDERS'];

  constructor(private myWorkoutService: MyWorkoutService,
              private loginSignupService: LoginSignupService,
              private savedWorkoutsService: SavedWorkoutsService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  this.subscription = this.loginSignupService.getLoginObservable()
    .subscribe(loginInfo => {
      this.userId = loginInfo.userId;
      this.isLoggedIn = loginInfo.isLoggedIn;
      this.username = loginInfo.username;
    });
  }

  ngOnInit() {
    this.workout = this.myWorkoutService.getCurrentWorkout();
    this.isLoggedIn = this.loginSignupService.isLoggedIn();
  }

  getNumberOfSets(exercise: Exercise) {
    let numberOfSets = '';

    if (exercise.muscle === 'ABS') {
      numberOfSets = '(30-60 seconds)'
    } else  if (this.workout.difficulty === 'BEGINNER') {
      if (this.largeMuscles.includes(exercise.muscle)) {
        numberOfSets = '(3-4 sets)';
      } else {
        numberOfSets = '(3 sets)';
      }
    } else if (this.workout.difficulty === 'INTERMEDIATE') {
      if (this.largeMuscles.includes(exercise.muscle)) {
        numberOfSets = '(4-5 sets)';
      } else {
        numberOfSets = '(4 sets)';
      }
    } else if (this.workout.difficulty === 'ADVANCED') {
      numberOfSets = '(5 sets)';
    }

    return numberOfSets;

  }

  resetWorkout() {
    this.myWorkoutService.clearCurrentWorkout();
    this.router.navigate(['/my-workout/new-workout']);
  }

  openOrderExerciseDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true
    dialogConfig.width = '35rem';
    dialogConfig.height = '100%';
    dialogConfig.position = {top: '4rem', right: '4rem'};

    dialogConfig.data = {
           id: 2,
           title: 'Change Exercise Order',
          // exercises: this.workout.exercises
    };

    const dialogRef = this.dialog.open(ChangeExerciseDialogComponent, dialogConfig);
    dialogRef.componentInstance.exercises = this.workout.exercises;

  }

  openSaveWorkoutDialog() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true
    dialogConfig.width = '30rem';
    dialogConfig.position = {top: '4rem', right: '4rem'};

    dialogConfig.data = {
           id: 1,
           title: 'Save Workout'
    };

    const dialogRef = this.dialog.open(SaveWorkoutDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            if (data.workoutName) {
              this.workout.name = data.workoutName;
              this.savedWorkoutsService.addWorkout(this.workout).subscribe((result) => {
                setTimeout(() => {
                  this.snackBar.open('Successfully saved ' + this.workout.name, 'Dismiss', {
                    duration: 7000
                  });
                }, 250);
              });
            }
          }
        }
    );
  }


  swapExercise(event: Exercise) {
    this.myWorkoutService.replaceExercise(event, this.workout.exercises.indexOf(event)).subscribe();
  }

  getWorkoutExerciseNames(): string[] {
    let workoutExerciseNames = [];
    this.workout.exercises.forEach((exercise) => {
      workoutExerciseNames.push(exercise.name);
    });
    return workoutExerciseNames;
  }
}
