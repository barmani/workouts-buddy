export class Exercise {
  name: string;
  description: string;
  muscle: string;
  equipment: string;
  videoLink?: string;

  constructor(name: string, description: string,
              muscle: string, equipment: string,
              videoLink?: string) {
    this.name = name;
    this.description = description;
    this.muscle = muscle;
    this.equipment = equipment;
    this.videoLink = videoLink;
  }

}
