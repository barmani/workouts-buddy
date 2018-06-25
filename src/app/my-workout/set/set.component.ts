import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../my-workout.service';


@Component({
    selector: 'app-set-component',
    templateUrl: './set.component.html'
})
export class SetComponent {

@Input() weight?: number;
@Input() unitOfMeasure?: string;
@Input() reps?: number;

unitsOfMeasure = ['LBS', 'KG'];
repOptions = Array.from({length: 100}, (v, k) => k+1);



}
