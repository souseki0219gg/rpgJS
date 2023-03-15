// キャラクター全体にかかわるプロパティをここに記述する

// キャラの初期値
const DefaultCharacterStatus = {
    name: "名無し",  // 名前
    maxHpLevel: 5,  // 最大hp
    hp: 100,  // hp
    maxMpLevel: 5,
    mp: 100,
    attackLevel: 5,
    defenseLevel: 5,
    speedLevel: 5,
    charmLevel: 5,
};

Object.freeze(DefaultCharacterStatus);

export { DefaultCharacterStatus };
