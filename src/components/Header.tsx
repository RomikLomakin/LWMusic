// import { useEffect, useReducer } from 'react'

import logo from '@/assets/lw.svg'
import { useAppSelector } from '@/store'

export function Header() {
  const userEmail = useAppSelector(state => state.user?.email)

  return (
    <div className="flex justify-between bg-[#ECEDF2] rounded-[20px] p-4">
      <div>
        <img alt="Логотип" src={logo} />
      </div>

      <div className="">{userEmail || 'Пользователь'}</div>
    </div>
  )
}
