import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../my-workout.service';


@Component({
    selector: 'app-set-component',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.css']
})
export class SetComponent {

  @Input() weight?: number;
  @Input() unitOfMeasure?: string;
  @Input() reps?: number;
  @Output() changeAmountOfSets: EventEmitter<string> = new EventEmitter<string>();// may want to change to js object w/ index to handle which to remove and avoid removing all

  unitsOfMeasure = ['LBS', 'KG'];
  repOptions = Array.from({length: 100}, (v, k) => k+1);

  addSet() {
    this.changeAmountOfSets.emit('add');
  }

  removeSet() {
    this.changeAmountOfSets.emit('remove');
  }

}
