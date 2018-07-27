import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../../services/my-workout.service';

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  @Input() title: string;
  @Input() items: string[];

  checkItem(event) {
    event.target.classList.toggle('checked');
  }
}
