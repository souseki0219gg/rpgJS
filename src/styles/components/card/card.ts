import { css } from "@emotion/react";

export const cardStyles = {
  container: css({
    flex: 1,
    aspectRatio: "1 / 2",
    padding: "2px",
  }),

  card: css({
    width: "100%",
    height: "100%",
    position: "relative",
    border: "1px solid black",
  }),

  gaugeOverlay: (ratio: number) => {
    const height = `${ratio * 100}%`;
    return css({
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: height,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    })
  },

  name: css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    writingMode: "vertical-rl",
    letterSpacing: "0.5em",
  }),

  remaining: css({
    position: "absolute",
    top: "100%",
    left: "100%",
    transform: "translate(-100%, -100%)",
    fontSize: "0.5em",
  }),
}
