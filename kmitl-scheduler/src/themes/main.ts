import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    background: {
      paper: 'rgba(27, 28, 41, 0.6)',
    },
  },
  typography: {
    fontFamily: ['Noto Sans Thai', 'Roboto'].join(','),
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
})

theme.components = {
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: 24,
        borderRadius: '20px',
        boxShadow: 'unset',
        backgroundColor: theme.palette.background.paper,
        selected: {
          backgroundColor: 'white',
        },
      },
    },
  },
}

export { theme }
