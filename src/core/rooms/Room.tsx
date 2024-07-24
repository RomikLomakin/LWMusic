import { useParams } from 'react-router-dom'

import { UsersList } from '@/components/UsersList.tsx'
import { Chat } from '@/components/chat/Chat.tsx'

export function Room() {
  // const { id } = useParams()

  return (
    <div className="flex h-full gap-x-2">
      <div className="flex flex-col gap-2 max-w-[320px]">
        <UsersList />
        <Chat />
      </div>

      <div>
        <div className="">ТУТ ЕБУЧЕЕ ВИДЕО КОТОРОЕ Я НЕ ЗНАЮ КАК ДЕЛАТЬ</div>
        <div className="">ОЧЕРЕДЬ</div>
      </div>
    </div>
  )
}
