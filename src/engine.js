const canvasWidth = 400;
const canvasHeight = 700;

function initGame() {
    // canvasを取得
    const canvas = document.getElementById("game_canvas");

    //ゲームに関する設定
    const config = {
        type: Phaser.CANVAS,
        canvas: canvas,
        width: canvasWidth,
        height: canvasHeight,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    //ゲームオブジェクトの生成
    const game = new Phaser.Game(config);
}

// ロード前に呼ばれる関数
function preload () {
    this.load.image("monster", "src/enemy/mon_025r.png");
    this.scene.add('my_scene', MyScene);
}

// 作成時に呼ばれる関数
function create () {
    const startButton = this.add.rectangle(canvasWidth / 2, 500, 150, 70, 44000000);
    const startText = this.add.text(canvasWidth / 2, 500, "スタート", { fontSize: "24px" })
    .setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
        // ゲームを開始する
        this.scene.start('my_scene');
    })
}

class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);


 // キャラクターのステータスを定義する
this.hp=100;
this.attack=10;
this.defense=5;

 // キャラクターをシーンに追加する
scene.add.existing(this);
}

  // キャラクターがダメージを受けるメソッド
takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
    this.die();
    }
}

// キャラクターが死亡するメソッド
die() {
    // キャラクターを削除する処理をここに記述する
}
}

class MyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'my_scene' });
    }
}
    create(); {

 // キャラクターを配置する
this.player = new Character(this, 100, 100, "player", 0);
this.enemy = new Character(this, 300, 100, "enemy", 0);

// ターンを制御するタイマーを作成する
this.turnTimer = this.time.addEvent({
    delay: 1000, // 1秒ごとにターンを切り替える
    callback: this.nextTurn,
    callbackScope: this,
    loop: true,
});

 // 入力を受け付けるためのハンドラーを設定する
this.input.keyboard.on("keydown", this.onKeyDown, this);

 // 戦闘終了を判定するための変数を初期化する
this.isBattleEnd = false;
    }

// シーンがアップデートされるたびに呼ばれるメソッド
update(time, delta); {
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
nextTurn(); {
    // 現在のターンを切り替える
    this.currentTurn = this.currentTurn === "player" ? "enemy" : "player";

     // 現在のターンのキャラクターを取得する
    const currentCharacter = this[this.currentTurn];
  // 現在のターンのキャラクターが行動できるか判定する
if (currentCharacter.canAct()) {
    // 行動できる場合、アクションを実行する
    currentCharacter.act();
} else {
    // 行動できない場合、次のターンへ進む
    this.nextTurn();
        }
    }
 // キーが押されたときに呼ばれるハンドラー
onKeyDown(event); {
    // 現在のターンのキャラクターを取得する
    const currentCharacter = this[this.currentTurn];

    // 現在のターンのキャラクターが行動できるか判定する
    if (currentCharacter.canAct()) {
      // 行動できる場合、アクションを実行する
currentCharacter.act(event.keyCode);
    }

// 戦闘を終了するメソッド
endBattle(winner); {
    // 戦闘終了を判定する変数を更新する
    this.isBattleEnd = true;

    // 勝者を表示する
    console.log(`${winner}の勝利！`);
    // シーンを遷移する
this.scene.start("GameOverScene", { winner: winner });
    }
}




// フレームごとに呼ばれる関数
function update () {
}

document.addEventListener("DOMContentLoaded", initGame);