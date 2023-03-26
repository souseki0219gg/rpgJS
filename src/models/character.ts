import { DefaultCharacterStatus as DefaultStatus } from "../constants/character";
import BattleScene from "../scenes/battle_scene";
import Action, { Actions, AttackData, TargetType } from "./action";
import narrate from "../utils/narrate";
import { formatHp } from "../utils/format";
import ActionCard from "./action_card";
import { TextureKeys } from "../constants/game";
import { StateAnomalies, StateAnomaly } from "./state_anomaly";

type CharacterStatusInitArgs = {
    name?: string,
    maxHpLevel?: integer,
    hp?: integer,
    maxMpLevel?: integer,
    mp?: integer,
    attackLevel?: integer,
    defenseLevel?: integer,
    speedLevel?: integer,
    charmLevel?: integer,
}

type CharacterStatus = {
    name: string,
    maxHpLevel: integer,
    hp: integer,
    maxMpLevel: integer,
    mp: integer,
    attackLevel: integer,
    defenseLevel: integer,
    speedLevel: integer,
    charmLevel: integer,
}


class Character extends Phaser.GameObjects.Sprite {
  public status: CharacterStatus;
  public cards: [ActionCard, ActionCard, ActionCard, ActionCard, ActionCard];
  private hpIndicator: Phaser.GameObjects.Text;
  scene: BattleScene;

  private readonly stateAnomalies: Array<StateAnomaly<StateAnomalies>>;


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
    scene: BattleScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined,
    status: CharacterStatusInitArgs = {},
  ) {
    super(scene, x, y, texture, frame);
    this.scene = scene; // 型変換のため

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

    const cardViewable = this instanceof Player;

    // 技カードを保存するプロパティ
    this.cards = [
      new ActionCard(
        scene,
        0,
        500,
        TextureKeys.actionCardKeys[0],
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 800,
          viewable: cardViewable,
        },
      ),
      new ActionCard(
        scene,
        80,
        500,
        TextureKeys.actionCardKeys[1],
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 1000,
          viewable: cardViewable,
        },
      ),
      new ActionCard(
        scene,
        160,
        500,
        TextureKeys.actionCardKeys[2],
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 2000,
          viewable: cardViewable,
        },
      ),
      new ActionCard(
        scene,
        240,
        500,
        TextureKeys.actionCardKeys[3],
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 3000,
          viewable: cardViewable,
        },
      ),
      new ActionCard(
        scene,
        320,
        500,
        TextureKeys.actionCardKeys[4],
        {
          action: new Action({
            type: Actions.attack,
            character: this,
            targetType: TargetType.opponent,
            data: new AttackData(),
          }),
          name: "攻撃",
          recharge: 4000,
          viewable: cardViewable,
        },
      ),
    ];

    // キャラクターをシーンに追加する
    scene.add.existing(this);

    // ステータスを表示させる
    this.hpIndicator = scene.add.text(x - 30, y + 100, formatHp(this.status.hp, this.maxHp));
  }

  public getStateAnomalies(): Array<StateAnomaly<StateAnomalies>> {
    return this.stateAnomalies;
  }

  // キャラクターがダメージを受けるメソッド
  async takeDamage(damage: integer) {
    this.status.hp -= damage;
    this.updateStatusIndicator();
    await narrate(this.scene, `${this.status.name}は${damage}ダメージくらった`);
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

  // キャラクターが死亡しているか確認するメソッド
  get isDead() {
    return this.status.hp <= 0;
  }

  // キャラクターが死亡するメソッド
  async die() {
    // キャラクターを削除する処理をここに記述する
    await narrate(this.scene, `${this.status.name}は死亡した`);
  }

  // キャラクターが回復するメソッド
  async restoreHealth(amount: integer, exceedMax = false) {
    const startHp = this.status.hp;
    this.status.hp += amount;
    if (!exceedMax && this.status.hp > this.maxHp) {
      this.status.hp = this.maxHp;
    }
    const diff = this.status.hp - startHp;
    await narrate(this.scene, `${this.status.name}の体力が${diff}回復した`);
    this.updateStatusIndicator();
    return diff;
  }

  // ステータス表示を更新するメソッド
  updateStatusIndicator() {
    this.hpIndicator.setText(formatHp(this.status.hp, this.maxHp));
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
        card.activateEffect();
      }
    }
  }

  reset() {
    this.restoreHealth(this.maxHp - this.status.hp);
    this.setVisible(true);
  }
}

export default Character;
