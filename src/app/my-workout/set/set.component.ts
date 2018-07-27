import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

import { Exercise } from '../../models/exercise.model';
import { MyWorkoutService } from '../../services/my-workout.service';
import { Set } from '../../models/set.model';

@Component({
    selector: 'app-set-component',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {

  @Input() set?: Set;
  @Input() exerciseId: string;
  @Input() index: number;
  @Input() setArrayLength: number; // have this to make sure the user cannot add more than 6 sets
  @Output() changeAmountOfSets: EventEmitter<{add: boolean, index: number}> = new EventEmitter<{add: boolean, index: number}>();

  repsFormControl = new FormControl();
  weightFormControl = new FormControl();
  unitOfMeasureFormControl = new FormControl();
  setForm: FormGroup
  unitsOfMeasure = ['LBS', 'KG'];
  repOptions = Array.from({length: 100}, (v, k) => k+1);

  constructor(private myWorkoutService: MyWorkoutService) {}

  ngOnInit() {
    if (this.set) {
      this.repsFormControl.setValue(this.set.reps);
      this.weightFormControl.setValue(this.set.weight);
      if (this.set.unitOfMeasure) {
        this.unitOfMeasureFormControl.setValue(this.set.unitOfMeasure);
      } else {
        this.unitOfMeasureFormControl.setValue(this.unitsOfMeasure[0]);
      }
    }
    this.setForm = new FormGroup({
      reps: this.repsFormControl,
      weight: this.weightFormControl,
      unitOfMeasure: this.unitOfMeasureFormControl
    });
    this.setForm.valueChanges.subscribe((value) => {
      this.set.reps = value.reps;
      this.set.unitOfMeasure = value.unitOfMeasure;
      this.set.weight = value.weight;
      if (localStorage.getItem('userId') && this.isValidEntry(value)) {
        this.myWorkoutService.setEdited(this.set, localStorage.getItem('userId'), this.exerciseId)
          .subscribe((updatedSet) => {
             if (!this.set._id) {
               this.set._id = updatedSet.obj._id;
             }
          });
      }
    });
  }

  addSet() {
    this.changeAmountOfSets.emit({add: true, index: this.index});
  }

  removeSet() {
    this.changeAmountOfSets.emit({add: false, index: this.index});
  }

  isValidEntry(value): boolean {
    return !isNaN(value.weight) && value.weight && value.reps;
  }

}
