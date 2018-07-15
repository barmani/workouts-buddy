import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginSignupService } from '../login-signup/login-signup.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit {
  username: string = localStorage.getItem('username');
  userId: string = localStorage.getItem('userId');
  subscription: Subscription;
  changePasswordFormGroup: FormGroup;

  constructor(private loginSignupService: LoginSignupService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
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
      oldPassword: new FormControl(),
      newPassword: new FormControl(),
      newPasswordConfirm: new FormControl()
    });
    // this.loginSignupService.getUserPage(this.userId).subscribe((result) => {
    //   console.log(result);
    // });
  }
}
