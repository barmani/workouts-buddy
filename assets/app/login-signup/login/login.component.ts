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

  constructor(private loginSignupService: LoginSignupService, private router: Router) {}

  onSubmit(form: NgForm) {
    const user = new User(form.value.username, form.value.email, form.value.password);
    this.loginSignupService.login(user).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/');
      },
      err => console.log(err)
    )
  }
}
