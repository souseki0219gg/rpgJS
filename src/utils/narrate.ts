import { isDebugMode } from "../constants/game";

const narrate = (scene: Phaser.Scene, text: string) => {
  if (isDebugMode) {
    console.log(text);
  }
  scene.events.emit("narrate", text);
};

export default narrate;
