import { Component } from '@angular/core';

import { CustomWorkoutService } from './custom-workout.service';
import { Exercise } from "../models/exercise.model";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-custom-workout',
    templateUrl: './custom-workout.component.html'
})
export class CustomWorkoutComponent {
  muscleFields = ['', 'BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'];
  equipmentFields = ['', 'BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'];
  searchResults: Exercise[];

  constructor(private customWorkoutService: CustomWorkoutService) {}

  search(form: NgForm) {
    const formValues = { muscle: form.value['muscle-groups'],
                         equipment: form.value['equipment-options'],
                         name: form.value['name-search']
                       };
    this.customWorkoutService.exerciseSearch(formValues)
      .subscribe((exercises: Exercise[]) => {
        this.searchResults = exercises;
      });

  }
}
