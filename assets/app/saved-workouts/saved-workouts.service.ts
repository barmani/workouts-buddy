import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import { map } from "rxjs/operators";

@Injectable()
export class SavedWorkoutsService {

  constructor(private http: Http) {}

  addWorkout(workout: Workout) {
    const body = JSON.stringify(workout);
    const headers = new Headers({'ContentType': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.patch('http://localhost:3000/saved-workouts/' + token, body, {headers: headers})
      .pipe(
        map((response: Response) => {
          const result = response.json();
          console.log(result);
        })
      );
  }
}
