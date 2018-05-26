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
      if (this.selectedMuscles.length == 3) {
        let removedMuscle = this.selectedMuscles[0].toLowerCase();
        setTimeout(() => {
          this.checkBoxes[removedMuscle] = false;
        });
        this.selectedMuscles.splice(0, 1);
      }
    } else {
      this.checkBoxes[event.srcElement.value] = false;
      this.selectedMuscles.splice(this.selectedMuscles.indexOf(event.srcElement.value.toUpperCase()), 1);
    }
    console.log(this.selectedMuscles);
    console.log(this.checkBoxes);
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
    let absChecked: boolean = form.value['abs-checkbox']  ? true : false;

    this.requestedWorkout = new RequestedWorkout(form.value['difficulty-radio'],
                                            this.selectedMuscles,
                                            absChecked);
    this.myWorkoutService.createNewWorkout(this.requestedWorkout)
      .subscribe(() => {
        this.router.navigate(['/my-workout/current-workout']);
      });
    form.resetForm();
  }
}
