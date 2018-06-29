export class Set {
  weight?: number;
  unitOfMeasure?: string;
  reps?: number;
  _id?: string;

  constructor(weight?: number, unitOfMeasure?: string, reps?: number, _id?: string) {
    this.weight = weight;
    this.unitOfMeasure = unitOfMeasure;
    this.reps = reps;
    this._id = _id;
  }
}
