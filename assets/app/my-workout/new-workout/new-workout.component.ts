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

  constructor(private myWorkoutService: MyWorkoutService, private router: Router) {}

  // add the string to the array. Use binding to check boxes with the string contained in them?
  onMuscleGroupInputSelected(event) {
    this.selectedMuscles.push(event.getAttribute('value').toUpperCase());
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
