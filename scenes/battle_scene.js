import Character from "../models/character.js";
import { getEnemyImagePath, getPlayerImagePath } from "../utils/get_path.js";

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'battle_scene' });
        // タイマー用の変数
        this.totalTimeElapsed = 0;
    }

    // ロード前に呼ばれる関数
    preload() {
        this.load.image("enemy", getEnemyImagePath('mon_025r'));
        this.load.image("player", getPlayerImagePath('mon_234r'));
    }


    create() {
        // キャラクターを配置する
        this.player = new Character(this, 100, 100, "player", 0, {
            name: "player",
            hp: 300,
        });
        this.enemy = new Character(this, 300, 100, "enemy", 0, {
            name: "enemy",
            hp: 1000,
        });

        // テキストオブジェクトを作成する
        this.narrationText = this.add.text(10, 10, "", {
            fontSize: "32px",
            fill: "#fff",
        });
        this.commandText = this.add.text(10, 50, "", {
            fontSize: "24px",
            fill: "#fff",
        });

        // 戦闘終了を判定するための変数を初期化する
        this.isBattleEnd = false;
    }

    // シーンがアップデートされるたびに呼ばれるメソッド
    update(time, delta) {
        // 戦闘が終了している場合は処理を終了する
        if (this.isBattleEnd) {
            return;
        }

        // 1秒ごとにターンを実行している
        this.totalTimeElapsed += delta;
        if (this.totalTimeElapsed > 1000) {
            this.handleTurn();
            this.totalTimeElapsed = 0;
        }
    }

    // 1ターンの処理全体をするメソッド
    handleTurn() {
        this.nextTurn();
        this.determineAction(this.currentCharacter);
        this.handleCharacterAct(this.currentCharacter);
        this.endTurn();
    }

    // 次のターンへ進むメソッド
    nextTurn() {
        // 現在のターンを切り替える
        this.currentTurn = this.currentTurn === "player" ? "enemy" : "player";

        // 現在のターンのキャラクターを取得する
        this.currentCharacter = this[this.currentTurn];

        // テキストオブジェクトに、現在のターンのキャラクターの名前を表示する
        this.narrationText.setText(`${this.currentCharacter.status.name}のターン`);
    }

    // コマンドで行動を選択するメソッド
    determineAction(currentCharacter) {
        if (currentCharacter.status.name == 'player') {
            // プレイヤーの場合
            // コマンドを入力する画面を表示する
            this.commandText.setText("アクションを選択してください：\n攻撃(a)、防御(d)、アイテム(i)");

            this.waitingForCommand = true;

            // コマンドが入力されたときのリスナーを定義
            this.input.keyboard.on("keydown", (event) => {
                if (this.waitingForCommand) {
                    switch (event.key) {
                        case "a":
                            // 攻撃を選択した場合
                            currentCharacter.addAction('attack');
                            this.waitingForCommand = false;
                            break;
                        case "d":
                            // 防御を選択した場合
                            currentCharacter.addAction('defend');
                            this.waitingForCommand = false;
                            break;
                        case "i":
                            // アイテムを選択した場合
                            currentCharacter.addAction('useItem');
                            this.waitingForCommand = false;
                            break;
                        default:
                            console.log('a, d, iのうちいずれかのキーを選択してください。')
                    }
                }
            });

            // コマンド入力が完了するまで待つ
            // 未記述

        } else {
            // 敵の場合
            currentCharacter.addAction('attack');
        }
    }


    // ターンのメイン処理を行うメソッド
    handleCharacterAct(currentCharacter) {
        currentCharacter.act();
    }

    endTurn() {
        // プレイヤーのHPが0以下の場合、敵の勝利として戦闘を終了する
        if (this.player.hp <= 0) {
            this.endBattle("enemy");
            return;
        }

        console.log("ターン終了");
    }

    // 戦闘を終了するメソッド
    endBattle(winner) {
        // 戦闘終了を判定する変数を更新する
        this.isBattleEnd = true;

        // 勝者を表示する
        console.log(`${winner}の勝利！`);
        // シーンを遷移する
        this.scene.start("GameOverScene", { winner: winner });
    }
}

export default BattleScene;