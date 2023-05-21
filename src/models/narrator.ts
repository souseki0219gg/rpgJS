import { narratorInterval, narratorTextCount } from "constants/game";

export default class Narrator  {
  private textStack: Array<string>;
  // 現在のテキストが表示されてからの経過時間
  public elapsedTime: number;

  constructor() {
    this.textStack = [];
    this.elapsedTime = 0;
  }

  addText(text: string) {
    this.textStack.push(text);
    if (this.textStack.length > narratorTextCount) {
      this.shiftText();
    }
  }

  shiftText() {
    this.textStack.shift();
    this.elapsedTime = 0;
  }

  process(deltaTime: number) {
    this.elapsedTime += deltaTime;
    if (this.elapsedTime > narratorInterval) {
      this.shiftText();
    }
  }

  get isNarrating() {
    return this.textStack.length > 0;
  }

  get currentTexts() {
    return this.textStack.slice(0, narratorTextCount);
  }
}
