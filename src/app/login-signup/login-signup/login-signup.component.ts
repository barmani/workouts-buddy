import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginSignupService } from '../login-signup.service';

@Component({
    selector: 'app-login-signup',
    templateUrl: './login-signup.component.html'
})
export class LoginSignupComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private changeDetector: ChangeDetectorRef,
              private loginSignupService: LoginSignupService,
              private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams['token'] === 'invalid') {
      // avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.snackBar.open('You are not signed or your token has expired. Please log in to access this page!', 'Dismiss', {
          duration: 7000
        });
      }, 250)
    // initial signup from verification email
    } else if (this.route.snapshot.queryParams['token']) {
      const username = this.route.snapshot.queryParams['username'];
      this.loginSignupService.login({username: username, password: ''}, this.route.snapshot.queryParams['token'])
        .subscribe(
          data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', username);
            this.loginSignupService.setLoginObservableValue(true, username, data.userId);
            this.router.navigateByUrl('/');
          }
      );
    }
  }

}
