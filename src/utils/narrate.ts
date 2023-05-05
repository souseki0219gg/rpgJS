import { isDebugMode } from "constants/game";
import Game from "models/game";

const narrate = async (game: Game, text: string) => {
  if (isDebugMode) {
    console.log(text);
  }
  game.narrator.addText(text);
};

export default narrate;
