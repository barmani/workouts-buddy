import { Component } from '@angular/core';

import { User } from './models/user.model';
import { LoginSignupService } from './login-signup/login-signup.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User = this.loginSignupService.currentUser;

  constructor(private loginSignupService: LoginSignupService) {}

  onLogout() {
    this.loginSignupService.logout();
  }
}
