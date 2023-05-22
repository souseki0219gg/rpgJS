/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';

export const gameWindowStyles = {
  container: (theme: Theme) => css({
    backgroundColor: theme.colors.background,
    width: "100%",
    height: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  }),

  topArea: css({
    width: "100%",
    flex: "none",
  }),

  middleArea: css({
    width: "100%",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),

  bottomArea: css({
    width: "100%",
    flex: "none",
  }),
    

  cardContainer: css({
    display: "flex",
  }),
}
