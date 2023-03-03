import Action, { Actions, AttackData, DefendData, ItemData, TargetType } from "../models/action";
import Character, { Enemy, Player } from "../models/character";
import { getActionCardImagePath, getEnemyImagePath, getPlayerImagePath } from "../utils/get_path";
import Narrator from "../models/narrator";
import { SceneKeys, TextureKeys } from "../constants/game";

class BattleScene extends Phaser.Scene {
    private player?: Character;
    private enemy?: Character;
    private isBattleEnd: boolean;
    public narrator?: Narrator;
    private commandText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: SceneKeys.battleSceneKey });
        // 戦闘終了を判定するための変数を初期化する
        this.isBattleEnd = false;
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
            hp: 1000,
        });
        // ナレーションオブジェクトを作成する
        this.narrator = new Narrator(this, 10, 490, TextureKeys.narratorKey, 0, "ナレーターの初期文字列");
        this.commandText = this.add.text(10, 50, "", {
            fontSize: "24px",
            stroke: "#fff",
        });
    }

    // シーンがアップデートされるたびに呼ばれるメソッド
    override update(time: number, delta: number) {
        // 戦闘が終了している場合は処理を終了する
        if (this.isBattleEnd) {
            return;
        }

        // アクションカードのクールタイムを進める
        for (const card of this.player!.cards) {
            card.process(delta);
        }
        for (const card of this.enemy!.cards) {
            card.process(delta);
        }

        // 敵のアクションカード実行処理を行う(未実装)

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
     * アクションをトリガーする関数
     * 
     * @param action 発火させるアクション
     */
    triggerAction(action: Action<Actions>) {
        // ここは実際にアクションが発動するようにする
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
    endBattle(winner: Character) {
        // 戦闘終了を判定する変数を更新する
        this.isBattleEnd = true;

        // 勝者を表示する
        console.log(`${winner.status.name}の勝利！`);
        // シーンを遷移する
        // 作っていないのでエラーとなる
        // this.scene.start("GameOverScene", { winner: winner });
    }
}

export default BattleScene;
