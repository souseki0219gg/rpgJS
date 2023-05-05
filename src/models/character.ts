import { DefaultCharacterStatus as DefaultStatus } from "../constants/character";
import Action, { Actions, AttackData, TargetType } from "./action";
import narrate from "../utils/narrate";
import ActionCard from "./action_card";
import { StateAnomalies, StateAnomaly } from "./state_anomaly";
import Game from "./game";

type CharacterStatusInitArgs = {
    name?: string,
    maxHpLevel?: number,
    hp?: number,
    maxMpLevel?: number,
    mp?: number,
    attackLevel?: number,
    defenseLevel?: number,
    speedLevel?: number,
    charmLevel?: number,
}

type CharacterStatus = {
    name: string,
    maxHpLevel: number,
    hp: number,
    maxMpLevel: number,
    mp: number,
    attackLevel: number,
    defenseLevel: number,
    speedLevel: number,
    charmLevel: number,
}


class Character {
  public readonly game: Game;
  public status: CharacterStatus;
  public cards: [ActionCard, ActionCard, ActionCard, ActionCard, ActionCard];

  private stateAnomalies: Array<StateAnomaly<StateAnomalies>>;


  get maxHp() {
    return this.status.maxHpLevel * 10;
  }
  get maxMp() {
    return this.status.maxMpLevel;
  }
  get attack() {
    return this.status.attackLevel * 3;
  }
  get defense() {
    return this.status.defenseLevel;
  }
  get speed() {
    return this.status.speedLevel;
  }
  get charm() {
    return this.status.charmLevel;
  }


  constructor(
    game: Game,
    status: CharacterStatusInitArgs = {},
  ) {
    // ゲームのインスタンスを保存するプロパティ
    this.game = game;

    this.stateAnomalies = [];

    // キャラクターのステータスを定義する
    this.status = {
      name: status.name || DefaultStatus.name,
      maxHpLevel: status.maxHpLevel || DefaultStatus.maxHpLevel,
      hp: status.hp || DefaultStatus.hp,
      attackLevel: status.attackLevel || DefaultStatus.attackLevel,
      defenseLevel: status.defenseLevel || DefaultStatus.defenseLevel,
      maxMpLevel: status.maxMpLevel || DefaultStatus.maxMpLevel,
      mp: status.mp || DefaultStatus.mp,
      speedLevel: status.speedLevel || DefaultStatus.speedLevel,
      charmLevel: status.charmLevel || DefaultStatus.charmLevel,
    };

    // 技カードを保存するプロパティ
    this.cards = [
      new ActionCard(
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 800,
        },
      ),
      new ActionCard(
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 1000,
        },
      ),
      new ActionCard(
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 2000,
        },
      ),
      new ActionCard(
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 3000,
        },
      ),
      new ActionCard(
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 4000,
        },
      ),
    ];
  }

  public getStateAnomalies(): Array<StateAnomaly<StateAnomalies>> {
    return this.stateAnomalies;
  }

  // キャラクターがダメージを受けるメソッド
  async takeDamage(damage: number) {
    if (this.isDead) {
      return;
    }
    this.status.hp -= damage;
    if (this.status.hp < 0) {
      this.status.hp = 0;
    }
    await narrate(this.game, `${this.status.name}は${damage}ダメージくらった`);
    if (this.isDead) {
      this.die();
    }
  }

  // 状態異常を付与されるメソッド
  takeStateAnomaly(stateAnomaly: StateAnomaly<StateAnomalies>) {
    const anomalyIndex = this.stateAnomalies.findIndex((anomaly) => anomaly.type === stateAnomaly.type);
    if (anomalyIndex === -1 || this.stateAnomalies[anomalyIndex].remaining < stateAnomaly.remaining) {
      // 状態異常を新しく追加するか、残り時間が引数より短い場合には更新する
      this.stateAnomalies[anomalyIndex] = stateAnomaly;
    }
  }

  // 状態異常の残り時間を減少させるメソッド
  decreaseStateAnomalyTime(deltaTime: number) {
    for (let i = 0; i < this.stateAnomalies.length; i++) {
      this.stateAnomalies[i].decreaseRemaining(deltaTime);
      if (this.stateAnomalies[i].remaining <= 0) {
        this.stateAnomalies.splice(i, 1);
        i--;
      }
    }
  }

  // 状態異常を解除するメソッド
  removeStateAnomaly(type: StateAnomalies) {
    const anomalyIndex = this.stateAnomalies.findIndex((anomaly) => anomaly.type === type);
    if (anomalyIndex !== -1) {
      this.stateAnomalies.splice(anomalyIndex, 1);
    }
  }

  // キャラクターが死亡しているか確認するメソッド
  get isDead() {
    return this.status.hp <= 0;
  }

  // キャラクターが死亡するメソッド
  async die() {
    // キャラクターを削除する処理をここに記述する
    await narrate(this.game, `${this.status.name}は死亡した`);
    // 2秒後に復活する
    setTimeout(() => {
      this.revive();
    }
    , 2000);
  }

  // キャラクターが復活するメソッド
  async revive() {
    this.status.hp = this.maxHp;
    this.status.mp = this.maxMp;
    this.stateAnomalies = [];
    await narrate(this.game, `${this.status.name}は復活した`);
  }

  // キャラクターが回復するメソッド
  async restoreHealth(amount: number, exceedMax = false) {
    const startHp = this.status.hp;
    this.status.hp += amount;
    if (!exceedMax && this.status.hp > this.maxHp) {
      this.status.hp = this.maxHp;
    }
    const diff = this.status.hp - startHp;
    await narrate(this.game, `${this.status.name}の体力が${diff}回復した`);
    return diff;
  }

  process(delta: number) {
    this.decreaseStateAnomalyTime(delta);
    for (const card of this.cards) {
      card.process(delta);
    }
  }
}

export class Player extends Character {
  // 味方の定義をここで行う
  // 味方特有の関数はここで定義する
}

export class Enemy extends Character {
  // 敵の定義をここで行う
  // 敵特有の関数はここで定義する

  processActionCard(delta: number) {
    
    // 平均して1秒に1回打つ方式
    for (const card of this.cards) {
      if (Math.random() < delta / 1000 / 5) {
        card.activateEffect(this.game);
      }
    }
  }

  reset() {
    this.restoreHealth(this.maxHp - this.status.hp);
  }

  override process(delta: number): void {
    super.process(delta);
    this.processActionCard(delta);
  }
}

export default Character;
