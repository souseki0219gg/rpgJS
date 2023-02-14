import { DefaultCharacterStatus as DefaultStatus } from "../constants/character";
import BattleScene from "../scenes/battle_scene";
import Action, { Actions } from "./action";
import narrate from "../utils/narrate";
import { formatHp } from "../utils/format";

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
    public actions: Array<Action>;
    private hpIndicator: Phaser.GameObjects.Text;
    scene: BattleScene;

    constructor(
        scene: BattleScene,
        x: number,
        y: number,
        texture: string | Phaser.Textures.Texture,
        frame?: string | number | undefined,
        status: CharacterStatusInitArgs = {}
    ) {
        super(scene, x, y, texture, frame);
        this.scene = scene;

        // キャラクターのステータスを定義する
        this.status = {
            name: status.name || DefaultStatus.name,
            maxHp: status.maxHp || DefaultStatus.maxHp,
            hp: status.hp || DefaultStatus.hp,
            attack: status.attack || DefaultStatus.attack,
            defense: status.defense || DefaultStatus.defense,
        };

        // 行動スタックを保存するプロパティ
        this.actions = [];

        // キャラクターをシーンに追加する
        scene.add.existing(this);

        // ステータスを表示させる
        this.hpIndicator = scene.add.text(x - 30, y + 100, formatHp(this.status.hp, this.status.maxHp));
    }

    // 行動を追加するメソッド
    addAction(action: Action) {
        this.actions.push(action);
    }

    // 行動を取り出すメソッド
    popAction() {
        const action = this.actions.pop();
        return action;
    }

    // キャラクターがダメージを受けるメソッド
    async takeDamage(damage: integer) {
        this.status.hp -= damage;
        await narrate(this.scene, `${this.status.name}は${damage}ダメージくらった`);
        if (this.isDead()) {
            this.die();
        }
        this.updateStatusIndicator();
    }

    // キャラクターが死亡しているか確認するメソッド
    isDead() {
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

    //キャラクターが行動可能か判定するメソッド
    canAct(action: Action) {
        return true;
    }

    // 行動を実行するメソッド
    async act() {
        // 行動スタックからアクションを取り出す
        const action = this.popAction();

        if (action == null) {
            await narrate(this.scene, `${this.status.name}は行動スタックがないので行動できない!`);
        } else if (this.canAct(action)) {
            await narrate(this.scene, `${this.status.name}は行動した`);
            // アクションを実行する
            switch (action.type) {
                case Actions.attack:
                    await this.attack(action.target);
                    break;
                case Actions.defend:
                    await this.defend();
                    break;
                case Actions.useItem:
                    await this.useItem();
                    break;
                default:
                    // 想定されていない値が来た場合の処理はここに書く
                    await narrate(this.scene, '想定されていない行動が入力されています');
            }
        } else {
            await narrate(this.scene, `${this.status.name}は行動できなかった`);
        }

        // キャラ行動終了時の共通処理はここに書く
    }

    // キャラが攻撃するメソッド
    async attack(target: Character | Character[]) {
        if (target instanceof Character) {
            await target.takeDamage(this.status.attack);
        } else {
            await target[0].takeDamage(this.status.attack);
        }
    }

    // キャラが防御するメソッド
    async defend() {
        await narrate(this.scene, `${this.status.name}は防御している`);
    }

    // キャラがアイテムを使うメソッド
    async useItem() {
        const itemId = 1;
        await narrate(this.scene, `${this.status.name}はアイテムを使った!`);
        switch (itemId) {
            case 1:
                await this.restoreHealth(100);
                break;
            default:
                await narrate(this.scene, 'しかし、何も起こらなかった');
        }
    }

    // ステータス表示を更新するメソッド
    updateStatusIndicator() {
        this.hpIndicator.setText(formatHp(this.status.hp, this.status.maxHp));
    }
}

class Player extends Character {
    // 味方の定義をここで行う
    // 味方特有の関数はここで定義する
}

class Enemy extends Character {
    // 敵の定義をここで行う
    // 敵特有の関数はここで定義する
}

export default Character;
