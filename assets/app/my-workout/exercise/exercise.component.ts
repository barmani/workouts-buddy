import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { Set } from '../../models/set.model';
import { MyWorkoutService } from '../my-workout.service';
import { Subscription } from 'rxjs/Subscription';

import { LoginSignupService } from '../../login-signup/login-signup.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() difficulty?: string;
  @Input() location: string;
  @Output() exerciseSelected = new EventEmitter<Exercise>();

  numberOfSets: string = '';
  largeMuscles = ['CHEST', 'BACK', 'LEGS'];
  smallMuscles = ['BICEPS', 'TRICEPS', 'SHOULDERS'];
  isLoggedIn: boolean;
  subscription: Subscription;
  username: string;
  userId: string = localStorage.getItem('userId');
  lastSets: Set[] = []; // the sets the user did for this exercise last time

  constructor(private loginSignupService: LoginSignupService,
              private myWorkoutService: MyWorkoutService,
              private sanitizer: DomSanitizer) {
    this.subscription = this.loginSignupService.getLoginObservable()
      .subscribe(loginInfo => {
        this.userId = loginInfo.userId;
        this.isLoggedIn = loginInfo.isLoggedIn;
        this.username = loginInfo.username;
        console.log(this.userId);
      });
  }

  ngOnInit() {
    if (this.difficulty === 'BEGINNER') {
      if (this.largeMuscles.includes(this.exercise.muscle)) {
        this.numberOfSets = '3-4';
      } else {
        this.numberOfSets = '3';
      }
    } else if (this.difficulty === 'INTERMEDIATE') {
      if (this.largeMuscles.includes(this.exercise.muscle)) {
        this.numberOfSets = '4-5';
      } else {
        this.numberOfSets = '4';
      }
    } else if (this.difficulty === 'ADVANCED') {
      this.numberOfSets = '5';
    }

    if (this.isLoggedIn) {

    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  outputExercise() {
    this.exerciseSelected.emit(this.exercise);
  }

}
