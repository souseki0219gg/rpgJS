import { Room } from "./room";

export class Floor {
    constructor(config) {
        this.floor = config.floor || 1;
        this.name = config.name || `深層第${this.floor}階`
        // 難しさ
        this.level = config.level || this.floor * 2 - 1;
        // 階層の大きさ
        this.size = config.size || 3;
        this.rooms = config.rooms || initRooms({
            size: this.size,
            level: this.level,
        });
        this.currentRoom = rooms.filter((room) => room.isFirst)[0];
    }

    initRooms(config) {
        // 部屋を作成する関数をここに記述する
        let rooms = [
            new Room({ floor: this }),
        ];
        return rooms;
    }

    goToNextRoom() {
        // 次の部屋に移動する
        if (this.currentRoom.isLast) {
            console.log("この部屋は最奥です");
        } else {
            this.currentRoom = this.currentRoom.nextRoom;
        }
    }
}