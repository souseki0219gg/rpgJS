import Action, { Actions } from "./action";
import Game from "./game";
import narrate from "utils/narrate";

export default class ActionCard {

  /**
   * このアクションカードを発動したときのアクション
   */
  public readonly action: Action<Actions>;
  /**
   * カードの名前
   */
  public readonly name: string;
  /**
   * クールタイム
   */
  public readonly recharge: number;
  /**
   * 残り時間
   */
  public remainingTime: number;

  constructor(
    config: {
      action: Action<Actions>,
      name: string,
      recharge: number,
    },
  ) {
    this.action = config.action;
    this.name = config.name;
    this.recharge = config.recharge;
    this.remainingTime = this.recharge;
  }

  /**
   * 効果発動できるかどうかを返す関数
   */
  get canEffect() {
    return this.remainingTime === 0;
  }

  activateEffect(game: Game) {
    if (this.canEffect) {
      narrate(game, `${this.name}のアクション発動！`);
      this.remainingTime = this.recharge;
      game.triggerAction(this.action);
    } else {
      narrate(game, "現在は実行できない！");
    }
  }

  /**
   * 効果発動できるための残り時間を減少させる
   * 
   * @param time 経過させる時間。この値だけ減少させる
   */
  process(time: number) {
    if (!this.canEffect) {
      this.remainingTime -= time;
      if (this.remainingTime <= 0) {
        this.remainingTime = 0;
      }
    }
  }
}
