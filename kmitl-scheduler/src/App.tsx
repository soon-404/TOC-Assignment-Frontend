import { Container, CssBaseline, styled } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'contexts/ThemeContext'
import { StoreProvider } from 'contexts/StoreContext'
import { Home } from 'pages/home'
import { NotFound } from 'pages/404'

const AppWrapper = styled(Container)`
  min-height: 100vh;
  width: 100vw;
  background: 'linear-gradient(250deg, #7b2ff7, #f107a3)';
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
      <StoreProvider>
        <CssBaseline />
        <AppWrapper>
          <Router />
        </AppWrapper>
      </StoreProvider>
    </ThemeProvider>
  )
}
