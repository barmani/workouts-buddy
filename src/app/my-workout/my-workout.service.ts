import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { RequestedWorkout } from "../models/requested-workout.model";

@Injectable()
export class MyWorkoutService {
  private currentWorkout: Workout;

  constructor(private http: Http) {}

  createNewWorkout(requestedWorkout: RequestedWorkout) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(requestedWorkout);
    return this.http.post('http://localhost:3000/my-workout/new-workout', body, {headers: headers})
      .pipe(
        map((response: Response) => {
          const result = response.json();
          const name = result.obj.name;
          const difficulty = result.obj.difficulty;
          let exercises: Exercise[] = [];
          result.obj.exercises.forEach((exercise) => {
            const newExercise: Exercise = new Exercise(exercise.name,
                                                       exercise.description,
                                                       exercise.muscle,
                                                       exercise.equipment,
                                                       exercise._id,
                                                       exercise.video);
            exercises.push(newExercise);
          });
          this.currentWorkout = new Workout(name, difficulty, exercises);
          this.updateSessionWorkout();
        })
      )

  }

  getCurrentWorkout() {
    return this.currentWorkout;
  }

  clearCurrentWorkout() {
    this.currentWorkout = null;
    this.clearSessionWorkout();
  }

  replaceExercise(exercise: Exercise, exerciseIndex: number) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify({exercise: exercise, workout: this.currentWorkout});
    return this.http.patch('http://localhost:3000/my-workout/current-workout', body, {headers: headers})
      .pipe(
        map((response: Response) => {
          const result = response.json();
          const newExercise = new Exercise(result.newExercise.name, result.newExercise.description,
                                           result.newExercise.muscle, result.newExercise.equipment,
                                           result.newExercise._id, result.newExercise.video);
          this.currentWorkout.exercises.splice(exerciseIndex, 1, newExercise);
          this.updateSessionWorkout();
        })
      );
  }

  setCurrentWorkout(workout: Workout) {
    this.currentWorkout = workout;
    this.updateSessionWorkout();
  }

  clearSessionWorkout() {
    sessionStorage.removeItem('currentWorkout');
  }

  updateSessionWorkout() {
    sessionStorage.setItem('currentWorkout', JSON.stringify(this.currentWorkout));
  }

  getUserSets(userId: string, exerciseId: string) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/user/' + userId + '/' + exerciseId + token)
      .pipe(
        map((response: Response) => {
          const result = response.json();
          return result.obj;
        }),
        catchError((error: Response) => throwError(error.json()))
      )
  }

}