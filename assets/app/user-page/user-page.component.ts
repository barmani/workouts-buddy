import { Component, OnInit } from '@angular/core';

import { LoginSignupService } from '../login-signup/login-signup.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit{
  userId: number

  constructor(private loginSignupService: LoginSignupService) {}

  ngOnInit() {
    this.loginSignupService.getUserPage();
  }
}
