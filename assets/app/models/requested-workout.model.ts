export class RequestedWorkout {
  difficulty: string;
  largeMuscleGroup: string;
  smallMuscleGroup: string;
  abs?: boolean;

  constructor(difficulty: string, largeMuscleGroup: string,
              smallMuscleGroup: string, abs?: boolean) {
    this.difficulty = difficulty;
    this.largeMuscleGroup = largeMuscleGroup;
    this.smallMuscleGroup = smallMuscleGroup;
    this.abs = abs;
  }

}
