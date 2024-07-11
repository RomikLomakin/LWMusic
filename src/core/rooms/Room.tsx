import { RoomType } from '@/core/rooms/types.ts'

import { MembersIcon } from '@/components/icons/MembersIcon'

export function Room({ room }: { room: RoomType }) {
  return (
    <div className="flex items-center justify-between bg-[#EEEDF6] rounded-xl pr-8">
      <div className="flex items-center">
        <div className="mr-7">
          <img alt="Превью комнаты" src={room.image} />
        </div>
        <div>
          <p className="text-2xl">{room.name}</p>
          <span className="text-[#5C5866]">{room.description}</span>
        </div>
      </div>
      <div className="flex items-center">
        <MembersIcon className="mr-2" />
        <span>27</span>
      </div>
    </div>
  )
}
