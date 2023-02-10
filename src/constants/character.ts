// キャラクター全体にかかわるプロパティをここに記述する

// キャラの初期値
const DefaultCharacterStatus = {
    name: "名無し",  // 名前
    maxHp: 200,  // 最大hp
    hp: 100,  // hp
    attack: 10,
    defense: 5,
};

Object.freeze(DefaultCharacterStatus);

export { DefaultCharacterStatus };
