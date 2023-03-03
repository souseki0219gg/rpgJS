export const formatHp = (hp: integer, maxHp?: integer) => {
  let result = "hp: " + hp.toString();
  if (maxHp != undefined) {
    result += "/" + maxHp.toString();
  }
  return result;
}

export const formatRemaining = (remaining: number, recharge: number) => {
  return Math.round(recharge - remaining).toString()
    + '/'
    + Math.round(recharge).toString();
}
