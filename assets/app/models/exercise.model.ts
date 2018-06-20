export class Exercise {
  name: string;
  description: string;
  muscle: string;
  equipment: string;
  _id: string;
  video?: string;


  constructor(name: string, description: string,
              muscle: string, equipment: string,
              _id: string, video?: string) {
    this.name = name;
    this.description = description;
    this.muscle = muscle;
    this.equipment = equipment;
    this._id = _id;
    this.video = video;
  }

}
