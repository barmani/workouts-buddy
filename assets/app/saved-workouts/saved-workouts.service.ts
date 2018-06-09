import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable()
export class SavedWorkoutsService {

  constructor(private http: Http) {}

  getWorkouts() {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/saved-workouts/' + token)
    .pipe(
      map((response: Response) => {
        const result = response.json();
        console.log(result);
      }), catchError((error: Response) => throwError(error.json()))
    );
  }
  addWorkout(workout: Workout) {
    const body = JSON.stringify(workout);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.patch('http://localhost:3000/saved-workouts/' + token, body, {headers: headers})
      .pipe(
        map((response: Response) => {
          const result = response.json();
          console.log(result);
        }), catchError((error: Response) => throwError(error.json()))

      );
  }
}
