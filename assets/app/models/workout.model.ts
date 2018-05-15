import { Exercise } from "./exercise.model";

export class Workout {
  name: string;
  difficulty: string;
  exercises: Exercise[];

  constructor(name: string, difficulty: string, exercises: Exercise[]) {
    this.name = name;
    this.difficulty = difficulty;
    this.exercises = exercises;
  }
}
