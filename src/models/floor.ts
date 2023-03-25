import { Room } from "./room.js";

type FloorInitArgs = {
    // 第何階か
    floor?: integer,
    // この階層の名前
    name?: string,
    // この階層のレベル（難易度）
    level?: integer,
    // この階層の規模
    size?: integer,
    // この階層に属する部屋
    rooms?: Array<Room>,
}

export class Floor {
  public floor: integer;
  public name: string;
  public level: integer;
  public size: integer;
  public rooms: Array<Room>;
  public currentRoom: Room;

  constructor(config: FloorInitArgs) {
    this.floor = config.floor || 1;
    this.name = config.name || `深層第${this.floor}階`;
    // 難しさ
    this.level = config.level || this.floor * 2 - 1;
    // 階層の大きさ
    this.size = config.size || 3;
    this.rooms = config.rooms || this.initRooms({
      size: this.size,
      level: this.level,
    });
    this.currentRoom = this.rooms.filter((room) => room.isFirst)[0];
  }

  initRooms(
    config: {
      size: integer,
      level: integer,
    }
  ): Array<Room> {
    // 部屋を作成する関数をここに記述する
    const rooms = [
      new Room({ floor: this }),
    ];
    return rooms;
  }

  goToNextRoom() {
    // 次の部屋に移動する
    if (this.currentRoom.isLast()) {
      console.log("この部屋は最奥です");
    } else {
      this.currentRoom = this.currentRoom.nextRoom!;
    }
  }
}
