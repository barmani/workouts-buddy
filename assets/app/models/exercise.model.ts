export class Exercise {
  name: string;
  description: string;
  muscle: string;
  equipment: string;
  video?: string;

  constructor(name: string, description: string,
              muscle: string, equipment: string,
              video?: string) {
    this.name = name;
    this.description = description;
    this.muscle = muscle;
    this.equipment = equipment;
    this.video = video;
  }

}
