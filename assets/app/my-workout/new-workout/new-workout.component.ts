import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from "@angular/forms";
import { MyWorkoutService } from "../my-workout.service";
import { RequestedWorkout } from "../../models/requested-workout.model";

enum Question {
  Difficulty,
  MuscleGroups,
  Abs
}
@Component({
    selector: 'app-new-workout',
    templateUrl: './new-workout.component.html',
    styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent {

  question = Question;
  currentQuestion = this.question.Difficulty;
  selectedMuscles: string[] = [];
  requestedWorkout: RequestedWorkout;
  checkBoxes = { chest: false,
                back: false,
                legs: false,
                triceps: false,
                biceps: false,
                shoulders: false
              };

  constructor(private myWorkoutService: MyWorkoutService, private router: Router) {}

  // add the string to the array. Use binding to check boxes with the string contained in them?
  onMuscleGroupInputSelected(event) {
    if (event.srcElement.checked) {
      this.selectedMuscles.push(event.srcElement.value.toUpperCase());
      this.checkBoxes[event.srcElement.value] = true;
      // make sure only two exercises are selected at once
      if (this.selectedMuscles.length == 3) {
        let removedMuscle = this.selectedMuscles[0].toLowerCase();
        // timeout so angular detects change
        setTimeout(() => {
          this.checkBoxes[removedMuscle] = false;
        });
        this.selectedMuscles.splice(0, 1);
      }
      // go to next page
      if (this.selectedMuscles.length == 2) {
        this.currentQuestion++;
      }
    } else {
      this.checkBoxes[event.srcElement.value] = false;
      this.selectedMuscles.splice(this.selectedMuscles.indexOf(event.srcElement.value.toUpperCase()), 1);
    }
  }

  onInputSelected(event) {
    const target = event.target;
    if (target.checked && this.currentQuestion < this.question.Abs) {
      this.currentQuestion++;
    }
  }

  previous() {
    if (this.currentQuestion != this.question.Difficulty) {
      this.currentQuestion--;
    }
  }

  onSubmit(form: NgForm) {
    if (this.selectedMuscles.length != 2) {
      alert('Please select two muscles');
      this.currentQuestion = this.question.MuscleGroups;
    } else {
      if (form.value['abs-checkbox']) {
        this.selectedMuscles.push('ABS');
      }

      this.requestedWorkout = new RequestedWorkout(form.value['difficulty-radio'],
                                              this.selectedMuscles);
      this.myWorkoutService.createNewWorkout(this.requestedWorkout)
        .subscribe(() => {
          this.router.navigate(['/my-workout/current-workout']);
        });
      form.resetForm();
    }
  }
}
