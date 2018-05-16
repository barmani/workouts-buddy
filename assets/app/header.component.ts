import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  template: `
      <header class="row">
        <nav class="col-md-8">
          <ul class="nav nav-pills">
            <li routerLinkActive="active"><a [routerLink]="['/my-workout']">Create/View Workout</a></li>
          <!---<li routerLinkActive="active"><a [routerLink]="['/custom-workout']">Custom Workout</a></li> -->
            <li routerLinkActive="active"><a [routerLink]="['/dash']">Dashboard</a></li>
          </ul>
        </nav>
      </header>
    `
})
export class HeaderComponent {

}
