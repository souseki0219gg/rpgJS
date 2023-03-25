import Action, { Actions, AttackData, DefendData, ItemData, TargetType } from "../models/action";
import Character, { Enemy, Player } from "../models/character";
import { getActionCardImagePath, getEnemyImagePath, getPlayerImagePath } from "../utils/get_path";
import Narrator from "../models/narrator";
import { SceneKeys, TextureKeys } from "../constants/game";
import waitUntil from "../utils/wait_until";

class BattleScene extends Phaser.Scene {
    private player?: Character;
    private enemy?: Enemy;
    private _isBattleEnd: boolean;
    public narrator?: Narrator;
    private commandText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: SceneKeys.battleSceneKey });
        // 戦闘終了を判定するための変数を初期化する
        this._isBattleEnd = false;
    }

    // ロード前に呼ばれる関数
    preload() {
        this.load.image(TextureKeys.enemyKey, getEnemyImagePath('mon_025r'));
        this.load.image(TextureKeys.playerKey, getPlayerImagePath('mon_234r'));
        for (const key of TextureKeys.actionCardKeys) {
            // TODO: アセット差し替えする
            this.load.image(key, getActionCardImagePath('action_card_frame'));
        }
    }


    create() {
        // キャラクターを配置する
        this.player = new Player(this, 100, 100, TextureKeys.playerKey, 0, {
            name: "player",
            hp: 300,
        });
        this.enemy = new Enemy(this, 300, 100, TextureKeys.enemyKey, 0, {
            name: "enemy",
            hp: 100,
        });
        // ナレーションオブジェクトを作成する
        this.narrator = new Narrator(this, 10, 490, TextureKeys.narratorKey, 0, "ナレーターの初期文字列");
        this.commandText = this.add.text(10, 50, "", {
            fontSize: "24px",
            stroke: "#fff",
        });
    }

    // シーンがアップデートされるたびに呼ばれるメソッド
    override async update(time: number, delta: number) {

        // アクションカードのクールタイムを進める
        for (const card of this.player!.cards) {
            card.process(delta);
        }
        for (const card of this.enemy!.cards) {
            card.process(delta);
        }

        this.player?.decreaseStateAnomalyTime(delta);

        this.enemy?.decreaseStateAnomalyTime(delta);

        // 戦闘が終了している場合は次の戦闘に向けて進める
        if (this._isBattleEnd) {
            await waitUntil(() => !this.narrator?.isNarrating);
            // 次の部屋に移る処理を記述する
            return;
        }

        // 敵のアクションカード実行処理を行う
        this.enemy?.processActionCard(delta);

        // ゲーム終了判定をする
        if (this.player!.isDead) {
            this.endBattle(this.enemy!);
            return;
        }
        if (this.enemy!.isDead) {
            this.endBattle(this.player!);
            return;
        }
    }

    /**
     * 戦闘が終了しているかどうか(戦闘中でないかどうか)
     */
    get isBattleEnd() {
        return this._isBattleEnd;
    };

    /**
     * 敵味方が初期化されていて、死んでいないか(戦闘が開始できるかどうか)
     */
    get ready() {
        return true
    }


    /**
     * アクションをトリガーする関数
     * 
     * @param action 発火させるアクション
     */
    triggerAction(action: Action<Actions>) {
        console.log(`${action.type}のアクションが発動しました`);
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
        if (character == this.player) {
            return this.enemy!;
        } else {
            return this.player!;
        }
    }

    // 戦闘を終了するメソッド
    async endBattle(winner: Character) {
        this._isBattleEnd = true;

        // 勝者を表示する
        console.log(`${winner.status.name}の勝利！`);

        // 敗者が敵なら、敵を見えなくする
        const loser = this.getOpponent(winner);
        if (loser == this.enemy) {
            this.enemy.setVisible(false);
        }

        // 経験値を獲得する
    }
}

export default BattleScene;
