export class Room {
    constructor(config) {
        this.name = config.name || "名もなき部屋";
        this.floor = config.floor;
        this.isFirst = config.isFirst || false;
        this.isLast = config.isLast || false;
        this.nextRoom = config.nextRoom;
    }
}