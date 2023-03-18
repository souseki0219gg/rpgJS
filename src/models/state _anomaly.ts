export enum  StateAnomaly {
    burn,
    //火傷
    poison,
    //毒
    corrosion,
    //腐蝕
    paralysis,
    //麻痺
    confusion,
    //混乱
    sleep,
    //睡眠
    bleeding,
    //出血
    freeze,
    //凍結
    electric,
    //感電
    blindness,
    //盲目
    glamour,
    //幻惑
    frenzy,
    //狂乱
    terror,
    //恐怖
}

export type StateAnomalyRemainingMap = {
    type: StateAnomaly, 
    time: number,
}
