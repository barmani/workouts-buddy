import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";
import { MyWorkoutService } from "./my-workout.service";

enum Question {
  Difficulty,
  LargeMuscle,
  SmallMuscle,
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

  constructor(private myWorkoutService: MyWorkoutService) {

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
    console.log(form);
    let absChecked: boolean = form.value['abs-checkbox']  ? true : false;
    this.myWorkoutService.createNewWorkout(form.value['difficulty-radio'],
                                           form.value['large-muscle-radio'],
                                           form.value['small-muscle-radio'],
                                           absChecked);
  }
}
