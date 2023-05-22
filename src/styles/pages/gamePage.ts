import { css } from "@emotion/react";

export const gamePageStyles = {
  stack: css({
    position: "relative",
    width: "100vw",
    height: "100vh",
    "> *": {
      position: "absolute",
      top: "0",
      left: "0",
    },
  }),
};
