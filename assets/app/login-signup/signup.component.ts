import { Component, OnInit } from '@angular/core';

import { LoginSignupService } from './login-signup.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  user: User;
  username = '';
  email = '';
  password = '';
  retypePassword = '';

  constructor(private loginSignupService: LoginSignupService) {}

  ngOnInit() {
    this.user = new User(this.username, this.email, this.password);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
