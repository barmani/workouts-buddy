import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-new-workout',
    templateUrl: './new-workout.component.html'
})
export class NewWorkoutComponent {

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
