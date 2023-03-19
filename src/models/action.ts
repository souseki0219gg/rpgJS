import Character from "./character";
import { StateAnomalies, StateAnomaly } from "./state _anomaly";

export enum Actions {
    /**
     * 通常攻撃
     */
    attack,
    /**
     * 防御
     */
    defend,
    /**
     * アイテムを使う
     */
    useItem,
}

export enum TargetType {
    /**
     * 自分自身に対する効果であることを表す
     */
    self,
    /**
     * 相手に対する効果であることを表す
     */
    opponent,
    /**
     * 自分自身と相手の両方に対する効果であることを表す
     */
    both,
    /**
     * 誰に対しても効果を及ぼさない、または対象を特に明示する必要がないことを表す
     */
    none,
}

type ActionTypeToDataMap = {
    [Actions.attack]: AttackData;
    [Actions.defend]: DefendData;
    [Actions.useItem]: ItemData;
}

/**
 * 各アクションのタイプに応じた追加データを記述するクラスの抽象クラス。
 * 
 * 各アクションの具体的なデータクラスはこのクラスを継承する必要がある。
 */
abstract class ActionData {
    constructor() { }

    /**
     * このアクションで発生する効果を記述した関数。最終的にこのコードが実行されることで効果が発動する。
     * 
     * @param character 行動主のキャラクター
     * @param target 行動対象のキャラクター
     */
    execute(character: Character, target: Character): void { }
}



export class percentageDamage extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        const damage = target.status.hp * 0.3;
        target.takeDamage(damage);
    }
}

export class PoisonState extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.slipDamage,
            level: 1,
            remaining: 30000,
        }))
    }
}

export class AttackData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeDamage(10);
    }
}

export class DefendData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        // 一定秒数防御力が上がる仕組みを実装する
    }
}

export class ItemData extends ActionData {
    constructor(
        public readonly config: {
            itemId: String,
        },
    ) {
        super()
    }

    execute(character: Character, target: Character): void {
        // アイテムを消費して、そのアイテムの効果を発動する仕組みをここに実装する
    }
}

class Action<T extends Actions> {
    /**
     * このアクションがどのタイプに属するかを示すプロパティ
     */
    public readonly type: T;
    /**
     * アクションの行動主。ターゲットと違い、こちらは`Action`の初期化時に決定される。
     */
    public readonly character: Character;
    /**
     * アクションの具体的なデータ。中身の型はアクションによって異なる。
     */
    public readonly data: ActionTypeToDataMap[T];
    /**
     * アクションのターゲットのタイプ。アクションの実行時に、このプロパティにしたがって行動対象が決定される。
     */
    public readonly targetType: TargetType;

    constructor(
        config: {
            type: T,
            character: Character,
            data: ActionTypeToDataMap[T],
            targetType: TargetType,
        },
    ) {
        this.type = config.type;
        this.character = config.character;
        this.data = config.data;
        this.targetType = config.targetType;
    }

    /**
     * アクションのメイン処理を実行する関数。これはscene側から呼びだされる。
     * 
     * 行動ターゲットを決定した後、その各ターゲットに対しこの関数が順番に発動していく。
     * 
     * @param target 行動ターゲット。
     */
    execute(target: Character) {
        this.data.execute(this.character, target);
    }
}


export default Action;
