import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Exercise } from "../../models/exercise.model";

@Component({
    selector: 'app-exercise-dialog',
    templateUrl: './change-exercise-dialog.component.html'
})
export class ChangeExerciseDialogComponent {
    exercises: Exercise[] = [];

    constructor(
        private dialogRef: MatDialogRef<ChangeExerciseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
          data.exercises.forEach((exercise) => {
            this.exercises.push(exercise);
          });
        }

    ngOnInit() {
      console.log(this.exercises);
    }


    save() {

    }

    close() {
        this.dialogRef.close();
    }

}
