import Character from "./character.js";

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'battle_scene' });
    }

    // ロード前に呼ばれる関数
    preload () {
        this.load.image("enemy", "src/enemy/mon_025r.png");
        this.load.image("player", "src/player/mon_234r.png");
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

        // ターンを制御するタイマーを作成する
        this.turnTimer = this.time.addEvent({
            delay: 1000, // 1秒ごとにターンを切り替える
            callback: this.nextTurn,
            callbackScope: this,
            loop: true,
        });

        // 戦闘終了を判定するための変数を初期化する
        this.isBattleEnd = false;
    }

    // シーンがアップデートされるたびに呼ばれるメソッド
    update(time, delta) {
        // キャラクター同士の衝突を判定する処理をここに記述する

        // 戦闘が終了している場合は処理を終了する
        if (this.isBattleEnd) {
            return;
        }

        // プレイヤーのHPが0以下の場合、敵の勝利として戦闘を終了する
        if (this.player.hp <= 0) {
            this.endBattle("enemy");
            return;
        }
    }

    // 次のターンへ進むメソッド
    nextTurn() {
        // 現在のターンを切り替える
        this.currentTurn = this.currentTurn === "player" ? "enemy" : "player";
        
        // 現在のターンのキャラクターを取得する
        const currentCharacter = this[this.currentTurn];

        // テキストオブジェクトに、現在のターンのキャラクターの名前を表示する
        this.narrationText.setText(`${currentCharacter.name}のターン`);

        this.handleTurn(currentCharacter);
    }

    // ターンのメイン処理を行うメソッド
    handleTurn(currentCharacter) {
        // 現在のターンのキャラクターが行動できるか判定する
        if (currentCharacter.canAct()) {
            // 行動できる場合、アクションを実行する
            currentCharacter.act();
        } else {
            // 行動できない場合、次のターンへ進む
            this.nextTurn();
        }
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