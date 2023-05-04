import { narratorInterval } from "constants/game";

export default class Narrator  {
  public textStack: Array<string>;
  private timer: number | undefined;

  constructor() {
    this.textStack = [];
  }

  addText(text: string) {
    if (this.isNarrating) {
      this.textStack.push(text);
    } else {
      this.timer = setInterval(() => {
        this.proceed();
      }, narratorInterval);
      this.textStack.push(text);
    }
  }

  // 次の文字列に進めるメソッド
  proceed() {
    console.log("proceed");
    if (this.textStack.length > 0) {
      this.textStack.shift();
    } else {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  // ナレーターがアクティブか確認するメソッド
  get isNarrating() {
    return this.timer !== undefined;
  }

  get text() {
    return this.textStack[0];
  }
}
