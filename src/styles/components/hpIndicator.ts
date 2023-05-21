import { css } from "@emotion/react";
import { getGaugeWidth, getHpColor } from "utils/indicator";


export const hpIndicatorStyles = {
  container: css({
    height: "0.5rem",
    width: "60px",
  }),

  gaugeContainer: css({
    height: "100%",
    width: "100%",
    border: "1px solid black",
  }),

  gauge: (ratio: number) => css({
    height: "100%",
    width: getGaugeWidth(ratio),
    backgroundColor: getHpColor(ratio),
  }),
};
