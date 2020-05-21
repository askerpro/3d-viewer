import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

interface MyThemeProdiver {
  theme?: Theme;
}

const darkThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#303030',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff0000',
      contrastText: '#fff',
    },
    type: 'dark',
  },
};

const defaultThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#303030',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff0000',
      contrastText: '#fff',
    },
  },
};

export const defalutTheme = responsiveFontSizes(createMuiTheme(defaultThemeOptions));

export const darkTheme = responsiveFontSizes(createMuiTheme(darkThemeOptions));

const MyThemeProvider: React.FC<MyThemeProdiver> = ({ children, theme = defalutTheme }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={defalutTheme}>{children}</StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default MyThemeProvider;
