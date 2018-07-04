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

}

changeAmountOfSets(event) {
  if (event.add) {
    this.sets.splice(event.index + 1, 0, new Set());
  } else {
    this.sets.splice(event.index, 1);
  }
}


}
