export class RequestedWorkout {
  difficulty: string;
  muscleGroups: string[];

  constructor(difficulty: string, muscleGroups: string[]) {
    this.difficulty = difficulty;
    this.muscleGroups = muscleGroups;
  }

}
