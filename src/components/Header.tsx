// import { useEffect, useReducer } from 'react'

import logo from '@/assets/lw.svg'
import { useAppSelector } from '@/store'

export function Header() {
  const userEmail = useAppSelector(state => state.user.email)

  return (
    <div className="flex justify-between bg-white rounded-[20px] p-3">
      <div>
        <img alt="Логотип" src={logo} />
      </div>

      <div className="">{userEmail}</div>
    </div>
  )
}
