import { css } from "@emotion/react";
import { getGaugeWidth, getHpColor } from "utils/indicator";


export const totalHpIndicatorStyles = {
  container: css({
    height: "1.5rem",
    width: "calc(100% - 4px)",
    position: "relative",
    margin: "0 2px"
  }),

  textContainer: css({
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  }),

  text: css({
    fontSize: "0.8rem",
  }),

  gaugeContainer: css({
    position: "absolute",
    top: "0",
    left: "0",
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
