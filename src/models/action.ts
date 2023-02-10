import Character from "./character";

export enum Actions {
    attack,
    defend,
    useItem,
}

class Action {
    constructor(
        public readonly type: Actions,
        // 行動主
        public readonly character: Character,
        // 行動ターゲット
        public readonly target: Array<Character> | Character,
    ) { }

    // 名前引数で指定できるようにするためのメソッド
    static from(
        { type, character, target }
            : {
                type: Actions,
                character: Character,
                target: Array<Character> | Character
            }
    ): Action {
        return new Action(type, character, target);
    }
}

export default Action;
