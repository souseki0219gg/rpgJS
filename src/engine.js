function initGame() {
    // canvasを取得
    const canvas = document.getElementById("game_canvas");

    //ゲームに関する設定
    const config = {
        type: Phaser.CANVAS,
        canvas: canvas,
        width: 400,
        height: 700,
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
}

// 作成時に呼ばれる関数
function create () {
    this.add.image(100, 200, "monster");
}

// フレームごとに呼ばれる関数
function update () {
}

document.addEventListener("DOMContentLoaded", initGame);