import { Box, CssBaseline, styled } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'contexts/ThemeContext'
import { StoreProvider } from 'contexts/StoreContext'
import { DialogProvider } from 'contexts/DialogContext'
import { reducer, State, Action, initialState } from 'reducers/course'
import { GlobalDialog } from 'components/Dialog/GlobalDialog'
import { Home } from 'pages/home'
import { NotFound } from 'pages/404'

import '@mobiscroll/react/dist/css/mobiscroll.min.css'

const AppWrapper = styled(Box)`
  min-height: 100vh;
  width: 100vw;
  padding: 16px;
  display: flex;
  box-sizing: border-box;
  background: linear-gradient(250deg, #7b2ff7, #f107a3);
`

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StoreProvider reducer={reducer} initialState={initialState}>
        <DialogProvider>
          <CssBaseline />
          <AppWrapper>
            <GlobalDialog />
            <Router />
          </AppWrapper>
        </DialogProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
