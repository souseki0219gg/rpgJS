import Character from "./character.js";

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'battle_scene' });
        // タイマー用の変数
        this.totalTimeElapsed = 0;
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

        // ターンを実行する処理を記述する
        this.totalTimeElapsed += delta;
        if (this.totalTimeElapsed > 1000) {
            this.handleTurn();
            this.totalTimeElapsed = 0;
        }

        // キャラクター同士の衝突を判定する処理をここに記述する

        // プレイヤーのHPが0以下の場合、敵の勝利として戦闘を終了する
        if (this.player.hp <= 0) {
            this.endBattle("enemy");
            return;
        }
    }

    // 1ターンの処理全体をするメソッド
    handleTurn() {
        this.nextTurn();
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
        this.narrationText.setText(`${this.currentCharacter.name}のターン`);

         // コマンドを入力する画面を表示する
    this.commandText.setText("アクションを選択してください：攻撃、防御、アイテム");

     // 入力されたコマンドを処理する
    this.input.keyboard.on("keydown", (event)) ;{
        switch (event.key) {
          case "a": // 攻撃を選択した場合
            currentCharacter.attack(this.enemy);
            break;
          case "d": // 防御を選択した場合
            currentCharacter.defend();
            break;
          case "i": // アイテムを選択した場合
            currentCharacter.useItem();
            break;
        }

         // 次のターンへ進む
    this.nextTurn();
    };



    // ターンのメイン処理を行うメソッド
    handleCharacterAct(currentCharacter) ;{
        currentCharacter.act();
    }

    endTurn() ;{
        console.log("ターン終了");
    }

    // 戦闘を終了するメソッド
    endBattle(winner) ;{
        // 戦闘終了を判定する変数を更新する
        this.isBattleEnd = true;

        // 勝者を表示する
        console.log(`${winner}の勝利！`);
        // シーンを遷移する
        this.scene.start("GameOverScene", { winner: winner });
        }
    }
}
export default BattleScene;