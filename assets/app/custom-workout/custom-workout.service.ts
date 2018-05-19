import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class CustomWorkoutService {

  constructor(private http: Http) {}

  getFields() {
    return this.http.get('http://localhost:3000/custom-workout')
      .map((response: Response) => {
        const result = response.json().obj;
        console.log(result);
        return result;
      });
  }
}
