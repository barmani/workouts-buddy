import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const BACKEND_URL = environment.backendUrl;

@Injectable()
export class CustomWorkoutService {

  constructor(private http: Http) {}

  exerciseSearch(searchParams: { muscle: string,
                                 equipment: string,
                                 name: string,
                                 usedExerciseNames: string[] }) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(searchParams);
    return this.http.post(BACKEND_URL + 'custom-workout', body, { headers: headers })
      .pipe(
        map((response: Response) => {
          const exercises: Exercise[] = response.json().exercises;
          return exercises;
        })
      );
  }

  getExerciseNames() {
    return this.http.get(BACKEND_URL + 'custom-workout')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }
}
