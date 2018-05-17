import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { RequestedWorkout } from "../models/requested-workout.model";

@Injectable()
export class MyWorkoutService {
  private currentWorkout: Workout;

  constructor(private http: Http) {}

  createNewWorkout(requestedWorkout: RequestedWorkout) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(requestedWorkout);
    return this.http.post('http://localhost:3000/my-workout/new-workout', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const name = result.obj.name;
        const difficulty = result.obj.difficulty;
        let exercises: Exercise[] = [];
        result.obj.exercises.forEach((exercise) => {
          const newExercise: Exercise = new Exercise(exercise.name,
                                                     exercise.description,
                                                     exercise.muscle,
                                                     exercise.equipment,
                                                     exercise.video);
          exercises.push(newExercise);
        });
        this.currentWorkout = new Workout(name, difficulty, exercises);
      });
  }

  getCurrentWorkout() {
    return this.currentWorkout;
  }

  clearCurrentWorkout() {
    this.currentWorkout = null;
  }
}
