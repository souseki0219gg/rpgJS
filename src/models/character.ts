import { DefaultCharacterStatus as DefaultStatus } from "../constants/character";
import BattleScene from "../scenes/battle_scene";
import Action, { Actions, AttackData, TargetType } from "./action";
import narrate from "../utils/narrate";
import { formatHp } from "../utils/format";
import ActionCard from "./action_card";
import { TextureKeys } from "../constants/game";

type CharacterStatusInitArgs = {
    name?: string,
    maxHp?: integer,
    hp?: integer,
    attack?: integer,
    defense?: integer,
}

type CharacterStatus = {
    name: string,
    maxHp: integer,
    hp: integer,
    attack: integer,
    defense: integer,
}

class Character extends Phaser.GameObjects.Sprite {
    public status: CharacterStatus;
    public cards: [ActionCard, ActionCard, ActionCard, ActionCard, ActionCard];
    private hpIndicator: Phaser.GameObjects.Text;
    scene: BattleScene;

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

        // キャラクターのステータスを定義する
        this.status = {
            name: status.name || DefaultStatus.name,
            maxHp: status.maxHp || DefaultStatus.maxHp,
            hp: status.hp || DefaultStatus.hp,
            attack: status.attack || DefaultStatus.attack,
            defense: status.defense || DefaultStatus.defense,
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
        this.hpIndicator = scene.add.text(x - 30, y + 100, formatHp(this.status.hp, this.status.maxHp));
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
    async restoreHealth(amount: integer, exceedMax: boolean = false) {
        let startHp = this.status.hp;
        this.status.hp += amount;
        if (!exceedMax && this.status.hp > this.status.maxHp) {
            this.status.hp = this.status.maxHp;
        }
        let diff = this.status.hp - startHp;
        await narrate(this.scene, `${this.status.name}の体力が${diff}回復した`);
        this.updateStatusIndicator();
        return diff;
    }

    // ステータス表示を更新するメソッド
    updateStatusIndicator() {
        this.hpIndicator.setText(formatHp(this.status.hp, this.status.maxHp));
    }
}

export class Player extends Character {
    // 味方の定義をここで行う
    // 味方特有の関数はここで定義する
}

export class Enemy extends Character {
    // 敵の定義をここで行う
    // 敵特有の関数はここで定義する
}

export default Character;
