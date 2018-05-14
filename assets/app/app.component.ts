import { Component } from '@angular/core';

import { MyWorkoutService } from "./my-workout/my-workout.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MyWorkoutService]
})
export class AppComponent {

}
