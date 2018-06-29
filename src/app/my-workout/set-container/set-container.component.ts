import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { Set } from '../../models/set.model';
import { MyWorkoutService } from '../my-workout.service';


@Component({
    selector: 'app-set-container',
    templateUrl: './set-container.component.html'
})
export class SetContainerComponent implements OnInit {

@Input() sets?: Set[];
@Input() exerciseId: string;

ngOnInit() {
  if (!this.sets || this.sets.length === 0) {
    // fill empty set with one set, then keep adding to it
    this.sets.push(new Set());
  }
}

changeAmountOfSets(event) {
  if (event.add) {
    this.sets.splice(event.index + 1, 0, new Set());
  } else {
    this.sets.splice(event.index, 1);
  }
}


}
