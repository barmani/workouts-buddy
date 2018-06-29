import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

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

  repsFormControl = new FormControl();
  weightFormControl = new FormControl();
  unitOfMeasureFormControl = new FormControl();
  setForm: FormGroup
  unitsOfMeasure = ['LBS', 'KG'];
  repOptions = Array.from({length: 100}, (v, k) => k+1);

  ngOnInit() {
    this.repsFormControl.setValue(this.reps);
    this.weightFormControl.setValue(this.weight);
    this.unitOfMeasureFormControl.setValue(this.unitOfMeasure);
    this.setForm = new FormGroup({
      reps: this.repsFormControl,
      weight: this.weightFormControl,
      unitOfMeasure: this.unitOfMeasureFormControl
    });
    this.setForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  addSet() {
    this.changeAmountOfSets.emit({add: true, index: this.index});
  }

  removeSet() {
    this.changeAmountOfSets.emit({add: false, index: this.index});
  }

}
