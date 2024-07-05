// import { CssBaseline } from '@mui/material'
import { Route, Router, Routes, useLocation } from 'react-router-dom'

import { AuthProvider } from '@/contexts/authContext.tsx'
import { GlobalStyles } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { StartScreen } from '@/components/StartScreen'
import { Authorization } from '@/components/authorization/Authorization.tsx'
import { SignIn } from '@/components/authorization/SignIn.tsx'
import { SignUp } from '@/components/authorization/SignUp.tsx'

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        // Отключить эффект нажатия
        // disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&:active': {
            '&:hover': {
              backgroundColor: '#000000',
            },
            backgroundColor: '#000000',
            boxShadow: 'none',
          },
          '&:hover': {
            backgroundColor: '#3C2F4A',
            boxShadow: 'none',
          },
          backgroundColor: '#180022',
          borderRadius: '16px',
          boxShadow: 'none',
          paddingBottom: '14px',
          paddingTop: '14px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            paddingBottom: '15px', //
            paddingTop: '15px', // Настраиваем верхний padding для текста
          },
          '&.Mui-focused': {
            '&:hover': {
              backgroundColor: '#E6E4FB',
            },
            backgroundColor: '#E6E4FB',
          },
          '&:after': {
            borderBottom: 'none',
          },
          '&:before': {
            borderBottom: 'none',
          },
          '&:hover': {
            backgroundColor: '#DEDBFF',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
          backgroundColor: '#E6E4FB',
          border: 'none',
          borderRadius: '16px',
        },
      },
    },
  },
})

export function App() {
  const location = useLocation()
  console.log('location', location)
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { color: '#180022' } }} />
        <AuthProvider>
          <Routes>
            <Route element={<StartScreen />} path="/login" />
            <Route element={<StartScreen />} path="/register" />
          </Routes>
          {/*{location.pathname === '/login' ||*/}
          {/*location.pathname === '/register' ? (*/}
          {/*  <StartScreen />*/}
          {/*) : (*/}
          {/*  <div>Вы на главной</div>*/}
          {/*)}*/}
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
