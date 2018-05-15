export class Exercise {
  name: string;
  description: string;
  muscle: string;
  equipment: string;

  constructor(name: string, description: string,
              muscle: string, equipment: string) {
    this.name = name;
    this.description = description;
    this.muscle = muscle;
    this.equipment = equipment;
  }

}
