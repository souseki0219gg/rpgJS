import { Floor } from "./floor";

export class Labyrinth {
    constructor(config) {
        this.name = config.name || "トコシエ";
        this.currentFloor = config.floor || new Floor({ floor: 1 });
    }

    goToNextFloor() {
        const floor = this.currentFloor.floor;
        this.currentFloor = new Floor({ floor: floor + 1 });
    }
}
