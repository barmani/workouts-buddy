import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { MyWorkoutService } from '../my-workout.service';
import { Exercise } from '../../models/exercise.model';
import { LoginSignupService } from '../../login-signup/login-signup.service';
import { SaveWorkoutDialogComponent } from '../save-workout-dialog.component';
import { Workout } from '../../models/workout.model';

@Component({
    selector: 'app-current-workout',
    templateUrl: './current-workout.component.html'
})
export class CurrentWorkoutComponent implements OnInit {
  workout: Workout;
  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private myWorkoutService: MyWorkoutService,
              private loginSignupService: LoginSignupService,
              private router: Router,
              private dialog: MatDialog) {
    this.subscription = this.loginSignupService.getLoginObservable()
      .subscribe(loginInfo => {
        this.isLoggedIn = loginInfo.isLoggedIn;
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
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
           id: 1,
           title: 'Save Workout'
    };

    const dialogRef = this.dialog.open(SaveWorkoutDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

  swapExercise(event: Exercise) {
    this.myWorkoutService.replaceExercise(event, this.workout.exercises.indexOf(event)).subscribe();
  }
}
