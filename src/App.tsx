// import { CssBaseline } from '@mui/material'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'

import { AuthProvider } from '@/contexts/authContext'
import { GlobalStyles } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { MainScreen } from '@/components/MainScreen'
import { StartScreen } from '@/components/StartScreen'

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
            backgroundColor: '#fff',
            borderRadius: '16px',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        // Отключить эффект нажатия
        // disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&.MuiButton-colorError': {
            '&.MuiButton-outlined': {
              '&.Mui-disabled': {
                opacity: 0.5,
              },
              '&:active': {
                boxShadow: 'none',
              },
              '&:hover': {
                backgroundColor: '#FF849A',
                boxShadow: 'none',
                color: 'white',
              },
              border: '2px solid #FF849A',
              color: '#FF849A',
            },
          },
          '&.MuiButton-colorPrimary': {
            '&.MuiButton-contained': {
              '&.Mui-disabled': {
                opacity: 0.5,
              },
              '&:active': {
                '&:hover': {
                  backgroundColor: '#7949C5',
                },
                backgroundColor: '#7949C5',
                boxShadow: 'none',
              },
              '&:hover': {
                backgroundColor: '#A46CFF',
                boxShadow: 'none',
              },
              backgroundColor: '#B79EFF',
              color: '#25263E',
              paddingBottom: '16px',
              paddingTop: '16px',
            },

            '&.MuiButton-outlined': {
              border: '2px solid #3C2F4A',
              color: '#25263E',
            },
          },
          '&.MuiButton-outlined': {
            fontSize: '14px',
            paddingBottom: '12px',
            paddingTop: '12px',
          },
          borderRadius: '16px',
          boxShadow: 'none',
          fontFamily: 'inherit',
          lineHeight: '20px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            // paddingBottom: '15px', //
            // paddingTop: '15px', // Настраиваем верхний padding для текста
          },
          '&.Mui-focused': {
            '& .MuiInputLabel-root': {
              color: 'red',
            },
            backgroundColor: '#fff',
          },
          '&:after': {
            borderBottom: 'none',
          },
          '&:before': {
            borderBottom: 'none',
          },
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '16px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#8B8DB3',
          },
        },
      },
    },
  },
  palette: {
    error: {
      main: '#FF849A',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      // '"Segoe UI"',
      'PP Neue Machina Plain',
      // '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export function App() {
  const location = useLocation()
  console.log('location', location)
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { color: '#180022' } }} />
        <ToastContainer
          autoClose={5000}
          closeOnClick
          draggable
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position="top-right"
          rtl={false}
          theme="light"
          transition={Zoom}
        />
        <AuthProvider>
          <Routes>
            <Route element={<StartScreen />} path="/" />
            <Route element={<StartScreen />} path="/register" />
            <Route element={<MainScreen />} path="/rooms" />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
