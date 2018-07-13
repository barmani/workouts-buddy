import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login-signup',
    templateUrl: './login-signup.component.html'
})
export class LoginSignupComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams['token'] === 'invalid') {
      console.log('adsfasdkfdfjalk');
    }

  }

}
