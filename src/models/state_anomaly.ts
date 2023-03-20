// 状態異常列挙型
export enum StateAnomalies {
    //スリップダメージ
    slipDamage,
    //攻撃力バフ
    AttackBuff,
    //防御力バフ
    DefenseBuff,
    //素早さバフ
    SpeedBuff,
    //魔力バフ
    CharmBuff,
    //即死率
    instantDeath,
    //クールタイム増加
    increaseCoolTime,
    //クールタイム停止
    stopCoolTime,
    //命中率バフ
    AccuracyRateBuff,
    //火属性やられ
    fireAttribute,
    //氷属性やられ
    freezingAttribute,
    //雷属性やられ 
    lightningAttribute,
    //被ダメージアップ
    increasedDamageSuffered,
}

export class StateAnomaly<T extends StateAnomalies> {
    public readonly type: T;
    public level: number;
    public remaining: number;

    constructor(config: {
        type: T,
        level: number,
        remaining: number,
    }) {
        this.type = config.type;
        this.level = config.level;
        this.remaining = config.remaining;
    }

    // 自分自身の残り時間を減少させる関数
    decreaseRemaining(delta: number) {
        this.remaining -= delta;
    }
}
