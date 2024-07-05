import { MouseEvent, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { auth } from '@/firebase'
import { Box, Button, Link as MuiLink } from '@mui/material'
import TextField from '@mui/material/TextField'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (
    e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password).then(resp => {
      console.log('resp', resp)
      console.log('auth', auth.currentUser)
    })
  }

  return (
    <div>
      <h1 className="text-[38px] raleway-bold mb-5">Вход</h1>
      <Box component="form">
        <div className="flex flex-col gap-y-3 mb-6">
          <TextField
            className="w-full"
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            value={email}
            variant="filled"
          />

          <TextField
            autoComplete="current-password"
            className="w-full"
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            value={password}
            variant="filled"
          />
        </div>

        <Button
          className="w-full"
          onClick={e => handleLogin(e)}
          type="submit"
          variant="contained"
        >
          Войти
        </Button>

        <div className="flex justify-center mt-5 gap-x-[10px]">
          <span className="text-[#A99FAD]">Нет аккаунта?</span>
          <RouterLink
            sx={{ color: '#180022', textDecorationColor: '#180022' }}
            to="/register"
          >
            <MuiLink sx={{ color: '#180022', textDecorationColor: '#180022' }}>
              Зарегистрироваться
            </MuiLink>
          </RouterLink>
        </div>
      </Box>
    </div>
  )
}
