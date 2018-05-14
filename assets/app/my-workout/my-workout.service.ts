import { Http, Response, Headers } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { RequestedWorkout } from "./requested-workout.model";


export class MyWorkoutService {

  createNewWorkout(requestedWorkout: RequestedWorkout) {
    console.log(requestedWorkout);
  }
}
