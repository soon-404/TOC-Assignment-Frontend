import React, { useMemo } from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
export const ThemeContext = React.createContext({ toggleColorMode: () => {} });

export const ThemeProvider: React.FC = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: ["Noto Sans Thai", "Roboto"].join(","),
          // h1: {
          //   fontSize: '40px',
          //   fontWeight: 'bold',
          //   fontStyle: 'normal',
          // },
          // h2: {
          //   fontSize: '32px',
          //   fontWeight: 'bold',
          //   fontStyle: 'normal',
          // },
          // h3: {
          //   fontSize: '28px',
          //   fontWeight: 'bold',
          //   fontStyle: 'normal',
          // },
          // h4: {
          //   fontSize: '20px',
          //   fontWeight: 'bold',
          //   fontStyle: 'normal',
          // },
          // h5: {
          //   fontSize: '16px',
          //   fontWeight: 'extraBold',
          //   fontStyle: 'normal',
          // },
          // h6: {
          //   fontSize: '12px',
          //   fontWeight: 'extraBold',
          //   fontStyle: 'normal',
          // },
        },
        breakpoints: {
          values: {
            xxs: 0,
            xs: 464,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1536,
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
