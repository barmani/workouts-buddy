import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { NgForm } from "@angular/forms";
import { MyWorkoutService } from "../my-workout.service";
import { RequestedWorkout } from "../../models/requested-workout.model";

enum Question {
  Difficulty,
  MuscleGroups,
  Abs
}
@Component({
    selector: 'app-new-workout',
    templateUrl: './new-workout.component.html',
    styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  levels = ['Level I', 'Level II', 'Level III'];
  levelChosen: string;

  question = Question;
  currentQuestion = this.question.Difficulty;
  selectedMuscles: string[] = [];
  requestedWorkout: RequestedWorkout;
  checkBox = { chest: false,
                back: false,
                legs: false,
                triceps: false,
                biceps: false,
                shoulders: false
              };

  levelsFormControl = new FormControl();
  chestFormControl = new FormControl();
  backFormControl = new FormControl();
  legsFormControl = new FormControl();
  tricepsFormControl = new FormControl();
  bicepsFormControl = new FormControl();
  shouldersFormControl = new FormControl();
  musclesSelected: AbstractControl[] = [];
  // Form Controls are Chest, Back, Legs, Biceps, Triceps, Shoulders
  // muscleGroupsFormArray = new FormArray([this.chestFormControl, this.backFormControl, this.legsFormControl,
  //                                        this.tricepsFormControl, this.bicepsFormControl, this.shouldersFormControl]);
  levelsFormGroup: FormGroup;
  muscleGroupFormGroup: FormGroup;

  constructor(private myWorkoutService: MyWorkoutService,
              private router: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.levelsFormGroup = this.fb.group({
      levelsFormControl: [this.levelsFormControl, Validators.required]
    });
    this.muscleGroupFormGroup = this.fb.group({
      chest: this.chestFormControl,
      back: this.backFormControl,
      legs: this.legsFormControl,
      triceps: this.tricepsFormControl,
      biceps: this.bicepsFormControl,
      shoulders: this.shouldersFormControl
    })

  }

  // add the string to the array. Use binding to check boxes with the string contained in them?
  onMuscleGroupInputSelected(event) {
    if (event.checked) {
      this.musclesSelected.push(this.muscleGroupFormGroup.controls[event.source.value]);
      if (this.musclesSelected.length > 2) {
        const removedControl = this.musclesSelected.splice(0, 1)[0] as FormControl;
        removedControl.setValue(false);
      }
    } else {
      this.musclesSelected.splice(this.musclesSelected
                                      .indexOf(this.muscleGroupFormGroup.controls[event.source.value], 1))
    }
  }

  // onInputSelected(event) {
  //   const target = event.target;
  //   if (target.checked && this.currentQuestion < this.question.Abs) {
  //     this.currentQuestion++;
  //   }
  // }

  previous() {
    if (this.currentQuestion != this.question.Difficulty) {
      this.currentQuestion--;
    }
  }

  onSubmit(form: NgForm) {
    if (this.selectedMuscles.length != 2) {
      alert('Please select two muscles');
      this.currentQuestion = this.question.MuscleGroups;
    } else {
      if (form.value['abs-checkbox']) {
        this.selectedMuscles.push('ABS');
      }

      this.requestedWorkout = new RequestedWorkout(this.levelChosen,
                                              this.selectedMuscles);
      this.myWorkoutService.createNewWorkout(this.requestedWorkout)
        .subscribe(() => {
          this.router.navigate(['/my-workout/current-workout']);
        });
      form.resetForm();
    }
  }
}
