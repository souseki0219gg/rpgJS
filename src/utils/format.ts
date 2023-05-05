export const formatHp = (hp: number, maxHp?: number): string => {
  let result = 'hp: ' + hp.toString();
  if (maxHp !== undefined) {
    result += '/' + maxHp.toString();
  }
  return result;
};

export const formatRemaining = (remaining: number, recharge: number): string => {
  return Math.round(recharge - remaining).toString() +
    '/' +
    Math.round(recharge).toString();
};
