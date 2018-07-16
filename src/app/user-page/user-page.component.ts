import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { PasswordValidation } from './password-validation';
import { MatSnackBar } from '@angular/material';

import { LoginSignupService } from '../login-signup/login-signup.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { Subscription } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit {
  username: string = localStorage.getItem('username');
  userId: string = localStorage.getItem('userId');
  subscription: Subscription;
  changePasswordFormGroup: FormGroup;

  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  newPasswordConfirm = new FormControl('', [Validators.required])

  constructor(private loginSignupService: LoginSignupService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.subscription = this.loginSignupService.getLoginObservable()
      .subscribe(loginInfo => {
        this.userId = loginInfo.userId;
        this.username = loginInfo.username;
      });
  }

  ngOnInit() {
    // only access this page if the user is signed in and it is their own page
    if (!this.userId || this.userId != this.route.snapshot.params['id']) {
      this.router.navigateByUrl('/login-signup?token=invalid');
    }
    this.changePasswordFormGroup = this.fb.group({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      newPasswordConfirm: this.newPasswordConfirm,
    }, {validator: PasswordValidation.MatchPassword});
    // this.loginSignupService.getUserPage(this.userId).subscribe((result) => {
    //   console.log(result);
    // });
  }

  changePassword() {
    this.loginSignupService.changeUserData(this.userId, this.oldPassword.value, this.newPassword.value).subscribe((response) => {
      console.log(response);
      setTimeout(() => {
        this.snackBar.open('Password changed successfully!', 'Dismiss', {duration: 4000});
      }, 250);
    }, (error) => {
      console.log(error);
      if (error.title === 'Incorrect password') {
        setTimeout(() => {
          this.snackBar.open('Password was incorrect, please try again', 'Dismiss', {duration: 4000});
        }, 250);
      }
    });
    this.changePasswordFormGroup.reset();
  }

  private equalPasswords() {
    return this.newPassword.value === this.newPasswordConfirm.value ? null : {mismatch: true};
  }
}
