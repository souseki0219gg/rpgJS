import BattleScene from "./battle_scene";
import { canvasHeight, canvasWidth, SceneKeys } from "../constants/game";

export default class initialScene extends Phaser.Scene {

  constructor() {
    super({ key: SceneKeys.initialSceneKey });
  }

  // ロード前に呼ばれる関数
  preload() {
    this.scene.add(SceneKeys.battleSceneKey, BattleScene);
  }

  // 作成時に呼ばれる関数
  create() {
    const startButton = this.add.rectangle(canvasWidth / 2, 500, 150, 70, 44000000);
    const startText = this.add.text(canvasWidth / 2, 500, "スタート", { fontSize: "24px" })
      .setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      // ゲームを開始する
      this.scene.start(SceneKeys.battleSceneKey);
    });
  }

  // フレームごとに呼ばれる関数
  update() {
    // アップデート関数
  }
}
