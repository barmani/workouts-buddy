export class RequestedWorkout {
  difficulty: string;
  muscleGroups: string[];
  abs?: boolean;

  constructor(difficulty: string, muscleGroups: string[], abs?: boolean) {
    this.difficulty = difficulty;
    this.muscleGroups = muscleGroups;
    this.abs = abs;
  }

}
