import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from 'contexts/ThemeContext'
import { StoreProvider } from 'contexts/StoreContext'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <StoreProvider>
        <CssBaseline />
        <App />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
