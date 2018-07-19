import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Exercise } from "../../models/exercise.model";

@Component({
    selector: 'app-exercise-dialog',
    templateUrl: './change-exercise-dialog.component.html',
    styleUrls: ['./change-exercise-dialog.component.css']
})
export class ChangeExerciseDialogComponent {
    exercises: Exercise[] = [];

}
