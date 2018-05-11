import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  template: `
      <header class="row">
        <nav class="col-md-8 col-md-offset-2">
          <ul class="nav nav-pills">
            <li><a>Dashboard</a></li>
            <li><a>New Workout</a></li>
            <li><a>Custom Workout</a></li>
          </ul>
        </nav>
      </header>
    `
})
export class HeaderComponent {

}
