import React, { useState } from 'react'

import { CreateRoomModal } from '@/core/rooms/CreateRoomModal.tsx'
import { Room } from '@/core/rooms/Room'
import { useRooms } from '@/core/rooms/hooks/useRooms.ts'
import { RoomType } from '@/core/rooms/types'
import { Button } from '@mui/material'

export function Rooms() {
  const { error, fetchRooms, loading, rooms } = useRooms()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClose = () => setIsOpen(false)

  const handleOpenCreateRoom = () => {
    setIsOpen(true)
  }

  // TODO возможно прикольно было бы запрашивать конкретную комнату и просто добавлять в массив, чтобы заново не тянуть все
  const handleRoomCreated = () => {
    fetchRooms()
  }

  return (
    <div className="bg-[#ECEDF2] flex-1 rounded-[20px] px-10 py-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[38px] font-ultrabold">Комнаты</h2>
        <Button
          className="font-neue"
          onClick={handleOpenCreateRoom}
          variant="outlined"
        >
          Создать комнату
        </Button>
      </div>

      <div className="flex flex-col gap-y-[2px]">
        {loading && <span>Загружаем...</span>}

        {rooms.map((room: RoomType, index) => (
          <Room key={index} room={room} />
        ))}
      </div>

      <CreateRoomModal
        handleClose={handleClose}
        isOpen={isOpen}
        onRoomCreated={handleRoomCreated}
      />
    </div>
  )
}
