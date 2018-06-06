import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-workout',
    template:
    `
    <div class="dialog-container">
      <h2 mat-dialog-title>Save Workout</h2>

      <mat-dialog-content [formGroup]="form">

        <mat-form-field>
            <label for="workout-name">Name:</label>
            <input matInput
                    name="workout-name"
                    placeholder=""
                   formControlName="workoutName">
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions>
        <button class="mat-raised-button"(click)="close()">Close</button>
        <button class="mat-raised-button mat-primary"(click)="save()">Save</button>
      </mat-dialog-actions>
    </div>
    `
})
export class SaveWorkoutDialogComponent {
    form: FormGroup;
    workoutName: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<SaveWorkoutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
          this.workoutName = data.workoutName;
        }

    ngOnInit() {
        this.form = this.fb.group({
            workoutName: [this.workoutName, []]
        });
    }


    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}
