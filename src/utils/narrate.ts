import { isDebugMode } from "../constants/game";
import BattleScene from "../scenes/battle_scene";
import waitUntil from "./wait_until";

const narrate = async (scene: BattleScene, text: string) => {
  if (isDebugMode) {
    console.log(text);
  }
  scene.narrator?.addText(text);
  await waitUntil(() => {
    return !scene.narrator?.isNarrating;
  });
};

export default narrate;
