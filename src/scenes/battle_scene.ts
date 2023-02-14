import Action, { Actions } from "../models/action";
import Character from "../models/character";
import { getEnemyImagePath, getPlayerImagePath } from "../utils/get_path";
import waitUntil from "../utils/wait_until";
import Narrator from "../models/narrator";
import narrate from "../utils/narrate";

class BattleScene extends Phaser.Scene {
    private player?: Character;
    private enemy?: Character;
    private waitingForCommand: boolean;
    private isBattleEnd: boolean;
    private isHandlingTurn: boolean;
    public narrator?: Narrator;
    private commandText?: Phaser.GameObjects.Text;
    private currentCharacter?: Character;
    private currentTurn: "player" | "enemy" | "else";

    constructor() {
        super({ key: 'battle_scene' });
        this.waitingForCommand = false;
        this.isHandlingTurn = false;
        // 戦闘終了を判定するための変数を初期化する
        this.isBattleEnd = false;
        this.currentTurn = "else";
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
        // ナレーションオブジェクトを作成する
        this.narrator = new Narrator(this, 10, 490, "narrator", 0, "ナレーターの初期文字列");
        this.commandText = this.add.text(10, 50, "", {
            fontSize: "24px",
            stroke: "#fff",
        });

        // コマンドが入力されたときのリスナーを定義
        this.input.keyboard.on("keydown", (event: KeyboardEvent) => {
            if (this.waitingForCommand) {
                switch (event.key) {
                    case "a":
                        // 攻撃を選択した場合
                        this.currentCharacter?.addAction(
                            Action.from({
                                type: Actions.attack,
                                character: this.currentCharacter,
                                target: this.enemy!,
                            })
                        );
                        this.waitingForCommand = false;
                        break;
                    case "d":
                        // 防御を選択した場合
                        this.currentCharacter?.addAction(
                            Action.from({
                                type: Actions.defend,
                                character: this.currentCharacter,
                                target: this.enemy!,
                            })
                        );
                        this.waitingForCommand = false;
                        break;
                    case "i":
                        // アイテムを選択した場合
                        this.currentCharacter?.addAction(
                            Action.from({
                                type: Actions.useItem,
                                character: this.currentCharacter,
                                target: this.currentCharacter
                            })
                        );
                        this.waitingForCommand = false;
                        break;
                    default:
                        console.log('a, d, iのうちいずれかのキーを選択してください。')
                }
            }
        });
    }

    // シーンがアップデートされるたびに呼ばれるメソッド
    override update(time: number, delta: number) {
        // 戦闘が終了している場合は処理を終了する
        if (this.isBattleEnd) {
            return;
        }

        if (!this.isHandlingTurn) {
            this.handleTurn();
        }
    }

    // 1ターンの処理全体をするメソッド
    async handleTurn() {
        if (!this.isHandlingTurn) {
            await this.beginTurn();
            await this.determineAction(this.currentCharacter!);
            await this.handleCharacterAct(this.currentCharacter!);
            this.endTurn();
        }
    }

    // 次のターンへ進むメソッド
    async beginTurn() {
        this.isHandlingTurn = true;

        // 現在のターンを切り替える
        this.currentTurn = this.currentTurn === "player" ? "enemy" : "player";

        // 現在のターンのキャラクターを取得する
        this.currentCharacter = this[this.currentTurn];

        // テキストオブジェクトに、現在のターンのキャラクターの名前を表示する
        await narrate(this, `${this.currentCharacter!.status.name}のターン`);
    }

    // コマンドで行動を選択するメソッド
    async determineAction(currentCharacter: Character) {
        if (currentCharacter == this.player) {
            // プレイヤーの場合
            // コマンドを入力する画面を表示する
            this.commandText?.setText("アクションを選択してください：\n攻撃(a)、防御(d)、アイテム(i)");

            this.waitingForCommand = true;

            // コマンド入力が完了するまで待つ
            await waitUntil(() => !this.waitingForCommand);

            this.commandText?.setText("");

        } else {
            // 敵の場合
            currentCharacter.addAction(
                Action.from({
                    type: Actions.attack,
                    character: currentCharacter,
                    target: this.player!,
                })
            );
        }
    }


    // ターンのメイン処理を行うメソッド
    async handleCharacterAct(currentCharacter: Character) {
        await currentCharacter.act();
    }

    endTurn() {
        // プレイヤーのHPが0以下の場合、敵の勝利として戦闘を終了する
        if (this.player!.isDead()) {
            this.endBattle(this.enemy!);
            return;
        } else if (this.enemy!.isDead()) {
            this.endBattle(this.player!);
            return;
        }

        narrate(this, "ターン終了");
        this.isHandlingTurn = false;
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
