import { useParams } from 'react-router-dom'

import { VideoPlayer } from '@/core/media-zone/VideoPlayer.tsx'

import { Chat } from '@/components/chat/Chat.tsx'
import { UsersList } from '@/components/users/UsersList.tsx'

export function Room() {
  // const { id } = useParams()

  return (
    <div className="flex h-full gap-x-2">
      <div className="flex flex-col gap-2 max-w-[320px]">
        <UsersList />
        <Chat />
      </div>

      <div className="w-full">
        <VideoPlayer />
        <div className="">ОЧЕРЕДЬ</div>
      </div>
    </div>
  )
}
