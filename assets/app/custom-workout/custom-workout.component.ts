import { Component, OnInit } from '@angular/core';

import { CustomWorkoutService } from './custom-workout.service';
@Component({
    selector: 'app-custom-workout',
    templateUrl: './custom-workout.component.html'
})
export class CustomWorkoutComponent implements OnInit {

  constructor(private customWorkoutService: CustomWorkoutService) {}

  ngOnInit() {
    this.customWorkoutService.getFields()
      .subscribe((fields: { muscleFields: string[], equipmentFields: string[] }) => {

      });
  }

}
