import { Component } from '@angular/core';

@Component({
  selector: 'app-my-workout',
  template: `
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
  `
})
export class MyWorkoutComponent {

}
