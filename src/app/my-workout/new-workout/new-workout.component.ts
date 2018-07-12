import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { NgForm } from "@angular/forms";
import { MyWorkoutService } from "../my-workout.service";
import { RequestedWorkout } from "../../models/requested-workout.model";

@Component({
    selector: 'app-new-workout',
    templateUrl: './new-workout.component.html',
    styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  levels = ['Level I', 'Level II', 'Level III'];
  levelChosen: string;

  selectedMuscles: string[] = [];
  requestedWorkout: RequestedWorkout;

  levelsFormControl = new FormControl();

  chestFormControl = new FormControl();
  backFormControl = new FormControl();
  legsFormControl = new FormControl();
  tricepsFormControl = new FormControl();
  bicepsFormControl = new FormControl();
  shouldersFormControl = new FormControl();

  absFormControl = new FormControl();
  musclesSelected: {muscle: string, control: AbstractControl}[] = [];
  levelsFormGroup: FormGroup;
  muscleGroupFormGroup: FormGroup;

  constructor(private myWorkoutService: MyWorkoutService,
              private router: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.levelsFormGroup = this.fb.group({
      levelsFormControl: this.levelsFormControl
    });
    this.muscleGroupFormGroup = this.fb.group({
      chest: this.chestFormControl,
      back: this.backFormControl,
      legs: this.legsFormControl,
      triceps: this.tricepsFormControl,
      biceps: this.bicepsFormControl,
      shoulders: this.shouldersFormControl,
      abs: this.absFormControl
    });
  }

  // add the string to the array. Use binding to check boxes with the string contained in them?
  onMuscleGroupInputSelected(event) {
    if (event.checked) {
      this.musclesSelected.push({muscle: (event.source.value as string).toUpperCase(),
                                 control: this.muscleGroupFormGroup.controls[event.source.value]});
      if (this.musclesSelected.length > 2) {
        const removedControl = this.musclesSelected.splice(0, 1)[0].control as FormControl;
        removedControl.setValue(false);
      }
    } else {
      this.musclesSelected.splice(
        this.musclesSelected.indexOf({muscle: (event.source.value as string).toUpperCase(),
                                      control: this.muscleGroupFormGroup.controls[event.source.value]}, 1));
    }
  }

  onSubmit() {
    if (this.musclesSelected.length != 2) {
      alert('Please select two muscles');
    } else {
      let muscleNames = [];
      this.musclesSelected.forEach((obj) => {
        muscleNames.push(obj.muscle);
      });
      if (this.absFormControl.value) {
        muscleNames.push('ABS');
      }
      this.requestedWorkout = new RequestedWorkout(this.levelsFormControl.value,
                                                   muscleNames);
      this.myWorkoutService.createNewWorkout(this.requestedWorkout)
        .subscribe(() => {
          console.log('here');
          this.router.navigate(['/my-workout/current-workout']);
        });
      this.levelsFormGroup.reset();
      this.muscleGroupFormGroup.reset();
    }
  }
}
