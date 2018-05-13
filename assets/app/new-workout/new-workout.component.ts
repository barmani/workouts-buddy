import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";

enum Question {
  Difficulty,
  LargeMuscle,
  SmallMuscle,
  Abs
}
@Component({
    selector: 'app-new-workout',
    templateUrl: './new-workout.component.html'
})
export class NewWorkoutComponent {

  question = Question;
  currentQuestion = this.question.Difficulty;

  onInputSelected(event) {
    const target = event.target;
    if (target.checked && this.currentQuestion < this.question.Abs) {
      console.log(event.target.value);
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
  }
}
