import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from './models/user.model';
import { LoginSignupService } from './login-signup/login-signup.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: User = this.loginSignupService.currentUser;
  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private loginSignupService: LoginSignupService, private router: Router) {
    this.subscription = this.loginSignupService.getLoginObservable()
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnInit() {
    this.isLoggedIn = this.loginSignupService.isLoggedIn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.loginSignupService.logout();
    this.router.navigateByUrl('/');
  }

}
