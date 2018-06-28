export class Set {
  weight?: number;
  unitOfMeasure?: string;
  reps?: number;

  constructor(weight?: number, unitOfMeasure?: string, reps?: number) {
    this.weight = weight;
    this.unitOfMeasure = unitOfMeasure;
    this.reps = reps;
  }
}
