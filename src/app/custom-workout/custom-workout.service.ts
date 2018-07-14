import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class CustomWorkoutService {

  constructor(private http: Http) {}

  exerciseSearch(searchParams: { muscle: string,
                                 equipment: string,
                                 name: string,
                                 usedExerciseNames: string[] }) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(searchParams);
    return this.http.post('http://localhost:3000/custom-workout', body, { headers: headers })
      .pipe(
        map((response: Response) => {
          const exercises: Exercise[] = response.json().exercises;
          return exercises;
        })
      );
  }

  getExerciseNames() {
    return this.http.get('http://localhost:3000/custom-workout')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }
}
