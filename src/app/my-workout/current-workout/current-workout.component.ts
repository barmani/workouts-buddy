import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from "@angular/material";

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

  constructor(private myWorkoutService: MyWorkoutService,
              private loginSignupService: LoginSignupService,
              private savedWorkoutsService: SavedWorkoutsService,
              private router: Router,
              private dialog: MatDialog) {
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

  resetWorkout() {
    this.myWorkoutService.clearCurrentWorkout();
    this.router.navigate(['/my-workout/new-workout']);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true
    dialogConfig.width = '400px';
    dialogConfig.position = {top: '-275vh', left: '155vh'};

    dialogConfig.data = {
           id: 1,
           title: 'Save Workout',
    };

    const dialogRef = this.dialog.open(SaveWorkoutDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            if (data.workoutName) {
              this.workout.name = data.workoutName;
              this.savedWorkoutsService.addWorkout(this.workout).subscribe();
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
