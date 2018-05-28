import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
