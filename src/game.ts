import Phaser from "phaser";
import "./utils/imports";
import initialScene from "./scenes/initial_scene";
import { canvasHeight, canvasWidth } from "./constants/game";

function initGame() {
    // canvasを取得
    const canvas = document.getElementById("game_canvas") as HTMLCanvasElement;

    //ゲームに関する設定
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        canvas: canvas,
        width: canvasWidth,
        height: canvasHeight,
        scene: initialScene,
    };

    //ゲームオブジェクトの生成
    const game = new Phaser.Game(config);
}



document.addEventListener("DOMContentLoaded", initGame);
