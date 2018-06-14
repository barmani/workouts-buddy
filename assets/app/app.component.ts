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
  isLoggedIn: boolean;
  subscription: Subscription;
  username: string;
  userId: string = localStorage.getItem['userId']

  constructor(private loginSignupService: LoginSignupService, private router: Router) {
    this.subscription = this.loginSignupService.getLoginObservable()
      .subscribe(loginInfo => {
        console.log(loginInfo);
        this.isLoggedIn = loginInfo.isLoggedIn;
        this.username = loginInfo.username;
      });
  }

  ngOnInit() {
    this.isLoggedIn = this.loginSignupService.isLoggedIn();
    this.username = this.loginSignupService.username();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.loginSignupService.logout();
    this.router.navigateByUrl('/');
  }

}
