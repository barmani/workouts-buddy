import { Http, Response, Headers } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from "rxjs";

export class MyWorkoutService {

  createNewWorkout(difficulty: string, largeMuscle: string, smallMuscle: string, abs: boolean) {
    console.log(difficulty + largeMuscle + smallMuscle + abs);
  }
}
