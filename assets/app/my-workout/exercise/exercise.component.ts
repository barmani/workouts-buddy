import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../my-workout.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() difficulty?: string;
  @Output() exerciseSwap = new EventEmitter<Exercise>();

  numberOfSets: string = '';
  largeMuscles = ['CHEST', 'BACK', 'LEGS'];
  smallMuscles = ['BICEPS', 'TRICEPS', 'SHOULDERS'];

  constructor(private myWorkoutService: MyWorkoutService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.difficulty === 'BEGINNER') {
      if (this.largeMuscles.includes(this.exercise.name)) {
        this.numberOfSets = '3-4';
      } else {
        this.numberOfSets = '3';
      }
    } else if (this.difficulty === 'INTERMEDIATE') {
      if (this.largeMuscles.includes(this.exercise.name)) {
        this.numberOfSets = '4-5';
      }
    } else if (this.difficulty === 'ADVANCED') {
      this.numberOfSets = '5';
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  swapExercise() {
    this.exerciseSwap.emit(this.exercise);
  }
}
