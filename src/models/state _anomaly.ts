export enum  StateAnomaly {
    slipDamage,
    //スリップダメージ
    AttackBuff,
    //攻撃力バフ
    DefenseBuff,
    //防御力バフ
    SpeedBuff,
    //素早さバフ
    CharmBuff,
    //魔力バフ
    instantDeath,
    //即死率
    increaseCoolTime,
    //クールタイム増加
    stopCoolTime,
    //クールタイム停止
    AccuracyRateBuff,
    //命中率バフ
}

export type StateAnomalyRemainingMap = {
    type: StateAnomaly, 
    time: number,
}
