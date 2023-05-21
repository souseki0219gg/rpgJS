export const getHpColor = (ratio: number) => {
  const r = Math.floor((1 - ratio) * 255);
  const g = Math.floor(ratio * 255);
  return `rgb(${r}, ${g}, 0)`;
};

export const getGaugeWidth = (ratio: number) => {
  if (ratio < 0) {
    return "0%";
  } else if (ratio > 1) {
    return "100%";
  } else {
    return `${ratio * 100}%`;
  }
};
