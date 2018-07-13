import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable()
export class SavedWorkoutsService {

  constructor(private http: Http, private router: Router) {}

  getWorkouts() {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/saved-workouts/' + token)
    .pipe(
      map((response: Response) => {
        const result = response.json();
        return result.obj;
      }), catchError((error, caught) => {
        if (error.status === 401) {
          this.router.navigateByUrl('/login-signup?token=invalid');
        }
        throwError(error.json());
        return new Observable();
      })
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
        }), catchError((error, caught) => {
          if (error.status === 401) {
            this.router.navigateByUrl('/login-signup?token=invalid');
          }
          throwError(error.json());
          return new Observable();
        })
      );
  }
}
