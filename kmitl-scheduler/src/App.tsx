import { Container, CssBaseline, styled } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'contexts/ThemeContext'
import { StoreProvider } from 'contexts/StoreContext'
import { Home } from 'pages/home'
import { NotFound } from 'pages/404'

const AppWrapper = styled(Container)`
  min-height: 100vh;
  width: 100vw;
`

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
