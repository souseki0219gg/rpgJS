import Character from "./character";
import { PlayerManager, EnemyManager } from "./character_manager";
import Action, { Actions, TargetType } from "./action";
import Narrator from "./narrator";

class Game {
  readonly playerManager: PlayerManager;
  readonly enemyManager: EnemyManager;
  readonly narrator: Narrator;

  private lastUpdateTime: number;

  constructor() {
    this.lastUpdateTime = performance.now();
    this.playerManager = new PlayerManager(this);
    this.enemyManager = new EnemyManager(this);
    this.narrator = new Narrator();
  }

  start() {
    // ゲームループを開始する
    this.update(performance.now());
  }

  private update(currentTime: number) {
    const deltaTime = currentTime - this.lastUpdateTime;
    const desiredFPS = 60;
    const frameInterval = 1000 / desiredFPS;

    if (deltaTime >= frameInterval) {
      // Update game state here
      this.playerManager.process(deltaTime);
      this.enemyManager.process(deltaTime);
      this.narrator.process(deltaTime);

      this.lastUpdateTime = currentTime;
    }

    requestAnimationFrame(this.update.bind(this));
  }

  /**
   * アクションをトリガーする関数
   * 
   * @param action 発火させるアクション
   */
  triggerAction(action: Action<Actions>) {
    const targets = this.getTargets(action.character, action.targetType);
    for (const target of targets) {
      action.execute(target);
    }
  }

  /**
   * ターゲットを計算して返す関数
   * @param character ターゲットを取得しようとしているキャラクター
   */
  getTargets(character: Character, targetType: TargetType) {
    const targets: Array<Character> = [];
    switch (targetType) {
    case TargetType.self:
    case TargetType.both:
      targets.push(character);
    }
    switch (targetType) {
    case TargetType.opponent:
    case TargetType.both:
      targets.push(this.getOpponent(character));
    }
    return targets;
  }

  /**
   * 相手を取得する関数
   * この関数は、プレイヤーと敵が初期化されてから呼びだす必要がある
   * 
   * @param character 行動するキャラ
   * @returns 相手のキャラ
   */
  getOpponent(character: Character) {
    if (character.manager instanceof PlayerManager) {
      return this.enemyManager.getTargetedCharacter();
    } else {
      return this.playerManager.getTargetedCharacter();
    }
  }
}

export default Game;
