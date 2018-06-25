import { Component, OnInit } from '@angular/core';

import { LoginSignupService } from '../login-signup/login-signup.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit {
  username: string;
  userId: string = localStorage.getItem('userId');
  subscription: Subscription;

  constructor(private loginSignupService: LoginSignupService) {}

  ngOnInit() {
    this.subscription = this.loginSignupService.getLoginObservable()
      .subscribe(loginInfo => {
        this.userId = loginInfo.userId;
        this.username = loginInfo.username;
      });
    this.loginSignupService.getUserPage(this.userId).subscribe();
  }
}
