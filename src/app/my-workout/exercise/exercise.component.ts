import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { Set } from '../../models/set.model';
import { MyWorkoutService } from '../my-workout.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() isLoggedIn: boolean;
  @Input() userId: string;

  largeMuscles = ['CHEST', 'BACK', 'LEGS'];
  smallMuscles = ['BICEPS', 'TRICEPS', 'SHOULDERS'];
  subscription: Subscription;
  username: string;
  lastSets: Set[] = []; // the sets the user did for this exercise last time
  safeVideo: SafeResourceUrl;

  constructor(private myWorkoutService: MyWorkoutService,
              private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.myWorkoutService.getUserSets(this.userId, this.exercise._id)
        .subscribe(data => {
          if (data && Object.keys(data.obj).length !== 0) {
            console.log(data);
            data.obj.forEach((set) => {
              this.lastSets.push(new Set(set.weight, set.unitOfMeasure, set.reps, set._id));
            });
          } else {
            this.lastSets.push(new Set());
          }
        },
        error => console.log(error)
        );
    }
    this.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.exercise.video);
  }

}
