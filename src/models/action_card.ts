import Action, { Actions } from "./action";
import Phaser from "phaser";
import BattleScene from "../scenes/battle_scene";
import { formatRemaining } from "../utils/format";


export default class ActionCard extends Phaser.GameObjects.Sprite {

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

  /**
   * 技カードの状態を表示するためのテキスト
   * 将来的にイメージ効果、スプライトに置き換える必要あり
   */
  private readonly indicator?: Phaser.GameObjects.Text;
  scene: BattleScene;

  constructor(
    scene: BattleScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    config: {
      action: Action<Actions>,
      name: string,
      recharge: number,
      /**
       * アクションカードを画面に表示するかどうか
       * 敵の場合は表示しない
       */
      viewable: boolean,
    },
    frame?: string | number | undefined,
  ) {
    super(scene, x, y, texture, frame);
    this.scene = scene; // 型変換のため
    this.action = config.action;
    this.name = config.name;
    this.recharge = config.recharge;
    this.remainingTime = this.recharge;

    if (config.viewable) {
      scene.add.existing(this);
      // タップされたときに技を発動するようにする
      this.setInteractive();
      this.on('pointerdown', () => {
        if (this.canEffect) {
          scene.triggerAction(this.action);
          this.remainingTime = this.recharge;
        } else {
          console.log("現在は実行できない！");
        }

      });
      this.indicator = scene.add.text(x, y - 30, '');
      this.updateIndicator();
    }
  }

  /**
   * 効果発動できるかどうかを返す関数
   */
  get canEffect() {
    return this.remainingTime === 0 && !this.scene.isBattleEnd
  }

  activateEffect() {
    console.log(`${this.name}の効果を発動した！`);
    this.remainingTime = this.recharge;
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
      this.updateIndicator();
    }
  }

  updateIndicator() {
    this.indicator?.setText(formatRemaining(this.remainingTime, this.recharge));
  }
}
