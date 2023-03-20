import Character from "./character";
import { StateAnomalies, StateAnomaly } from "./state_anomaly";

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
    //恐怖
    terror,
    //狂乱
    frenzy,
    //幻惑
    glamour,
    //盲目
    blindness,
    //感電
    electricShock,
    //凍結
    freeze,
    //睡眠
    sleep,
    //麻痺
    paralysis,
    //腐食
    corrosion,
    //火傷
    Burn,
    //割合ダメージ
    PercentageDamage,
    //毒
    Poison,
    //混乱
    confusion,
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
    [Actions.terror]: TerrorData;
    [Actions.frenzy]: FrenzyData;
    [Actions.glamour]: GlamourData;
    [Actions.blindness]: BlindnessData;
    [Actions.electricShock]: ElectricShockData;
    [Actions.freeze]: FreezeData;
    [Actions.sleep]: SleepData;
    [Actions.paralysis]: ParalysisData;
    [Actions.corrosion]: CorrosionData;
    [Actions.Burn]: BurnData;
    [Actions.PercentageDamage]: PercentageDamageData;
    [Actions.Poison]: PoisonData;
    [Actions.confusion]: confusionData;
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

export class TerrorData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.AttackBuff,
            level: -1,
            remaining: 30000
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.DefenseBuff,
            level: -1,
            remaining: 30000
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.SpeedBuff,
            level: -1,
            remaining: 30000
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.CharmBuff,
            level: -1,
            remaining: 30000
        }))
    }
}

export class FrenzyData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.AttackBuff,
            level: 1,
            remaining: 30000
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.AccuracyRateBuff,
            level: -1,
            remaining: 30000
        }))
    }
}

export class GlamourData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.AttackBuff,
            level: -1,
            remaining: 30000
        }))
    }
}

export class BlindnessData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
    target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.AccuracyRateBuff,
            level: 1,
            remaining: 30000,

        }))
    }
}

export class ElectricShockData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.lightningAttribute,
            level: 1,
            remaining: 30000
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.increasedDamageSuffered,
            level: 1,
            remaining: 30000,
        }))

        if (Math.random() < 0.5) {
            target.takeStateAnomaly(new StateAnomaly({
                type: StateAnomalies.AccuracyRateBuff,
                level: -1,
                remaining: 30000,
            }))
        }
    }
}

export class FreezeData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.increaseCoolTime,
            level: 1,
            remaining: 30000
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.freezingAttribute,
            level: 1,
            remaining: 30000
        }))
    }
}

export class SleepData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.stopCoolTime,
            level: 1,
            remaining: 30000,
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.increasedDamageSuffered,
            level: 1,
            remaining: 30000
        }))
    }
}

export class confusionData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.increasedDamageSuffered,
            level: 1,
            remaining: 30000,
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.AccuracyRateBuff,
            level: -1,
            remaining: 30000,
        }))
    }
}

export class CorrosionData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.increasedDamageSuffered,
            level: 1,
            remaining: 30000,
        }))

        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.slipDamage,
            level: 1,
            remaining: 30000,
        }))
    }
}

export class ParalysisData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.increaseCoolTime,
            level: 1,
            remaining: 60000,
        }))
    }
}

export class BurnData extends ActionData{
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.slipDamage,
            level: 1,
            remaining: 30000,
        }))
        target.takeStateAnomaly(new StateAnomaly({
            type: StateAnomalies.fireAttribute,
            level: 1,
            remaining: 30000,
        }))
    }
}

export class PercentageDamageData extends ActionData {
    constructor() {
        super()
    }

    execute(character: Character, target: Character): void {
        const damage = target.status.hp * 0.3;
        target.takeDamage(damage);
    }
}

export class PoisonData extends ActionData {
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
