import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { RequestedWorkout } from "./requested-workout.model";

@Injectable()
export class MyWorkoutService {

  constructor(private http: Http) {}

  createNewWorkout(requestedWorkout: RequestedWorkout) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(requestedWorkout);
    return this.http.post('http://localhost:3000/my-workout/current-workout', body, {headers: headers})
      .map((response: Response) => {
        console.log(response.json());
      });
  }
}
