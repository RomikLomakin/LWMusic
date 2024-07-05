import { MouseEvent, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { auth } from '@/firebase'
import { Box, Button, Link as MuiLink } from '@mui/material'
import TextField from '@mui/material/TextField'
import {
  createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
} from 'firebase/auth'

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setCopyPassword] = useState('')

  const handleRegister = (
    e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    if (copyPassword !== password) return

    createUserWithEmailAndPassword(auth, email, password).then(resp => {
      console.log('resp', resp)
    })
  }

  return (
    <div>
      <h1 className="text-[38px] raleway-bold mb-5">Регистрация</h1>
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
            autoComplete="new-password"
            className="w-full"
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            value={password}
            variant="filled"
          />

          <TextField
            autoComplete="new-password"
            className="w-full"
            onChange={e => setCopyPassword(e.target.value)}
            placeholder="Повторите пароль"
            type="password"
            value={copyPassword}
            variant="filled"
          />
        </div>

        <Button
          className="w-full"
          onClick={e => handleRegister(e)}
          type="submit"
          variant="contained"
        >
          Зарегистрироваться
        </Button>

        <div className="flex justify-center mt-5 gap-x-[10px]">
          <span className="text-[#A99FAD]">Уже есть аккаунт?</span>
          <RouterLink to="/login">
            <MuiLink
              sx={{
                color: '#180022',
                textDecorationColor: '#180022',
              }}
              to="/login"
            >
              Войти
            </MuiLink>
          </RouterLink>
        </div>
      </Box>
    </div>
  )
}
