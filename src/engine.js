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
}

// 作成時に呼ばれる関数
function create () {
}

// フレームごとに呼ばれる関数
function update () {
}

document.addEventListener("DOMContentLoaded", initGame);