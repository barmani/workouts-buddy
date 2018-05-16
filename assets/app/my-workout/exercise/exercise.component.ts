import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../my-workout.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html'
})
export class ExerciseComponent {

  @Input() exercise: Exercise;

  constructor(private myWorkoutService: MyWorkoutService, private sanitizer: DomSanitizer) {}

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
