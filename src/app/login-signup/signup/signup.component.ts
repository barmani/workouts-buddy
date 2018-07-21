import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LoginSignupService } from '../login-signup.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

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
  usernameTaken = false;
  emailTaken = false;

  constructor(private loginSignupService: LoginSignupService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.user = new User(this.username, this.email, this.password);
  }

  onSubmit(form: NgForm) {
    this.user.username = form.value['username-signup'];
    this.user.password = form.value.password;
    this.user.email = form.value['email-signup'];
    this.loginSignupService.signup(this.user)
      .subscribe(
        (data) => {
          this.usernameTaken = false;
          this.emailTaken = false;
          setTimeout(() => {
            this.snackBar.open('Please check your email to verify your account!',
                               'Dismiss', {duration: 5000});
          }, 250);
        },
        (error) => {
          if (error.error.message.includes('unique')) {
            if (error.error.message.includes('username')) {
              this.usernameTaken = true;
              this.emailTaken = false;
            } else if (error.error.message.includes('email')) {
              this.emailTaken = true;
              this.usernameTaken = false;
            }
          }
        }
      );
  }

}
