import BattleScene from "./battle_scene.js";

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
    this.scene.add('battle_scene', BattleScene);
}

// 作成時に呼ばれる関数
function create () {
    const startButton = this.add.rectangle(canvasWidth / 2, 500, 150, 70, 44000000);
    const startText = this.add.text(canvasWidth / 2, 500, "スタート", { fontSize: "24px" })
    .setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
        // ゲームを開始する
        this.scene.start('battle_scene');
    })
}

// フレームごとに呼ばれる関数
function update () {
}

document.addEventListener("DOMContentLoaded", initGame);