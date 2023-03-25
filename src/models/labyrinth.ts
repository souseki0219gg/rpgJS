import { Floor } from "./floor";

type LabyrinthInitArgs = {
    name?: string,
    floor?: Floor,
}

export class Labyrinth {
  public name: string;
  public currentFloor: Floor;

  constructor(config: LabyrinthInitArgs) {
    this.name = config.name || "トコシエ";
    this.currentFloor = config.floor || new Floor({ floor: 1 });
  }

  goToNextFloor() {
    const floor = this.currentFloor.floor;
    // 毎回新たにフロアを生成して次に渡す
    this.currentFloor = new Floor({ floor: floor + 1 });
  }
}
