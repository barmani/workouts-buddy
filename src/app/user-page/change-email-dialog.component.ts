import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from "@angular/material";
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector: 'app-save-email',
    template:
    `
    <div class="dialog-container">
      <h2 mat-dialog-title>Change Email</h2>
      <p>Current email: {{ currentEmail }}</p>
      <mat-dialog-content [formGroup]="form">

        <mat-form-field>
            <input matInput
                   name="change-email"
                   type="email"
                   placeholder="Change Email"
                   formControlName="emailFormControl"
                   [errorStateMatcher]="matcher"
                   email>
            <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
              Format: john@doe.com
            </mat-error>
            <mat-error *ngIf="emailFormControl.hasError('required')">
              Email is <strong>required</strong>
            </mat-error>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions>
        <button class="mat-raised-button" (click)="close()" type="button">Close</button>
        <button class="mat-raised-button mat-primary" (click)="save()" type="submit">Save</button>
      </mat-dialog-actions>
    </div>
    `
})
export class ChangeEmailDialogComponent {
    form: FormGroup;
    currentEmail: string;
    emailFormControl = new FormControl
    matcher = new MyErrorStateMatcher();

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ChangeEmailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
          this.currentEmail = data.email;
        }

    ngOnInit() {
        this.form = this.fb.group({
            emailFormControl: this.emailFormControl
        });
    }


    save() {
      if (this.emailFormControl.valid) {
        this.dialogRef.close(this.form.value);
      }
    }

    close() {
        this.dialogRef.close();
    }

}
