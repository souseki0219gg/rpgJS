export const formatHp = (hp: integer, maxHp?: integer) => {
  let result = "hp: " + hp as unknown as string;
  if (maxHp != undefined) {
    result += "/" + maxHp as unknown as string;
  }
  return result;
}
