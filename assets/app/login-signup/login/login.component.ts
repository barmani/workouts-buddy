import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginSignupService } from '../login-signup.service';

import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidUsername = false;
  invalidPassword = false;

  constructor(private loginSignupService: LoginSignupService, private router: Router) {}

  onSubmit(form: NgForm) {
    const formInfo = {username: form.value['username-login'], password: form.value['password-login']};
    this.loginSignupService.login(formInfo).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.loginSignupService.setLoginObservableValue(true, formInfo.username);
        this.router.navigateByUrl('/');
      },
      err => {
        if (err.title === "Incorrect password") {
          this.invalidPassword = true;
          this.invalidUsername = false;
        } else if (err.title === "User not found") {
          this.invalidUsername = true;
          this.invalidPassword = false;
        } else {
          this.invalidPassword = false;
          this.invalidUsername = false;
        }
      }
    )
    form.reset();
  }
}
