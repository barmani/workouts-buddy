import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { LoginSignupService } from '../../services/login-signup.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidUsername = false;
  invalidPassword = false;

  constructor(private loginSignupService: LoginSignupService,
              private router: Router,
              private snackBar: MatSnackBar) {}

  onSubmit(form: NgForm) {
    const formInfo = {username: form.value['username-login'], password: form.value['password-login']};
    this.loginSignupService.login(formInfo).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', formInfo.username);
        this.loginSignupService.setLoginObservableValue(true, formInfo.username, data.userId);
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

  forgotPassword(username: string) {
    if (confirm('Send a password to this user\'s email with a new temporary password?')) {
      this.loginSignupService.forgotPassword(username).subscribe((response) => {
        this.invalidUsername = false;
        setTimeout(() => {
          this.snackBar.open('Please check your email to retrive your new password!',
                             'Dismiss', {duration: 5000});
        }, 250);
      },
      (err) => {
        if (err.title === 'User not found') {
          this.invalidUsername = true;
        }
      });
    }
  }
}
