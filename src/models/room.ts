import { Floor } from "./floor";

type RoomInitArgs = {
    name?: string,
    floor: Floor;
    isFirst?: boolean;
    nextRoom?: Room | null;
}

export class Room {
    public name: string;
    public floor: Floor;
    public isFirst: boolean;
    public nextRoom: Room | null;

    constructor(config: RoomInitArgs) {
        this.name = config.name || "名もなき部屋";
        this.floor = config.floor;
        this.isFirst = config.isFirst || false;
        this.nextRoom = config.nextRoom || null;
    }

    isLast() {
        return this.nextRoom === null;
    }
}
