import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { Set } from '../../models/set.model';
import { MyWorkoutService } from '../my-workout.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() difficulty?: string;
  @Input() location: string;
  @Input() isLoggedIn: boolean;
  @Input() userId: string;
  @Output() exerciseSelected = new EventEmitter<Exercise>();

  largeMuscles = ['CHEST', 'BACK', 'LEGS'];
  smallMuscles = ['BICEPS', 'TRICEPS', 'SHOULDERS'];
  subscription: Subscription;
  username: string;
  lastSets: Set[] = []; // the sets the user did for this exercise last time

  constructor(private myWorkoutService: MyWorkoutService,
              private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.myWorkoutService.getUserSets(this.userId, this.exercise._id)
        .subscribe(data => {
          if (data && Object.keys(data.obj).length !== 0) {
            data.obj.sets.forEach((set) => {
              this.lastSets.push(new Set(set.weight, set.unitOfMeasure, set.reps, set._id));
            });
          } else {
            this.lastSets.push(new Set());
          }
        },
        error => console.log(error)
        );
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  outputExercise() {
    this.exerciseSelected.emit(this.exercise);
  }

}
