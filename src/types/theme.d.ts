import '@emotion/react';

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}

