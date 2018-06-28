import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../my-workout.service';


@Component({
    selector: 'app-set-component',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {

  @Input() weight?: number;
  @Input() unitOfMeasure?: string;
  @Input() reps?: number;
  @Input() index: number;
  @Input() setArrayLength: number; // have this to make sure the user cannot add more than 6 sets
  @Output() changeAmountOfSets: EventEmitter<{add: boolean, index: number}> = new EventEmitter<{add: boolean, index: number}>();

  unitsOfMeasure = ['LBS', 'KG'];
  repOptions = Array.from({length: 100}, (v, k) => k+1);

  ngOnInit() {
  }

  addSet() {
    this.changeAmountOfSets.emit({add: true, index: this.index});
  }

  removeSet() {
    this.changeAmountOfSets.emit({add: false, index: this.index});
  }

}
