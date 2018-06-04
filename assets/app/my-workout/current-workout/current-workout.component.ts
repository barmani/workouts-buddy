import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MyWorkoutService } from '../my-workout.service';
import { Exercise } from '../../models/exercise.model';
import { LoginSignupService } from '../../login-signup/login-signup.service';
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
              private router: Router) {
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

  saveWorkout() {
    
  }

  swapExercise(event: Exercise) {
    this.myWorkoutService.replaceExercise(event, this.workout.exercises.indexOf(event)).subscribe();
  }
}
