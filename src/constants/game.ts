// ゲーム全体にかかわるプロパティをここに記述する

export const canvasWidth = 400;
export const canvasHeight = 700;

/**
 * デバッグモードかどうか
 * これが`true`の場合、ログが通常よりも多く残るようになる
 */
export const isDebugMode = true;

/**
 * ナレーターが次の文章に移る間隔
 */
export const narratorInterval = 500;

export class SceneKeys {
  static initialSceneKey = "initial_scene";
  static battleSceneKey = "battle_scene";
}

export class TextureKeys {
  static playerKey = "player";
  static enemyKey = "enemy";
  static narratorKey = "narrator";
  static actionCardKeys = [
    "card0",
    "card1",
    "card2",
    "card3",
    "card4",
  ];
}
