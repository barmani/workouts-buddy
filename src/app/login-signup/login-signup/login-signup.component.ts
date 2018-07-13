import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login-signup',
    templateUrl: './login-signup.component.html'
})
export class LoginSignupComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams['token'] === 'invalid') {
      // avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.snackBar.open('You are not signed or your token has expired. Please log in to access this page!', 'Dismiss', {
          duration: 7000
        });
      }, 250)
    }
  }

}
