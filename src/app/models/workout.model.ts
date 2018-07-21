import { Exercise } from "./exercise.model";

export class Workout {
  name: string;
  difficulty: string;
  exercises: Exercise[];
  _id?: string;
  createdAt?: Date;

  constructor(name: string, difficulty: string, exercises: Exercise[], _id?: string, createdAt?: Date) {
    this.name = name;
    this.difficulty = difficulty;
    this.exercises = exercises;
    this._id = _id;
    this.createdAt = createdAt;
  }
}
