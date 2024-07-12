import React, { useEffect, useState } from 'react'

import { CreateRoomModal } from '@/core/rooms/CreateRoomModal.tsx'
import { Room } from '@/core/rooms/Room'
import { RoomType } from '@/core/rooms/types'
import { db } from '@/firebase.ts'
import { Backdrop, Button, Modal } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
// import { animated, useSpring } from '@react-spring/web'
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
} from 'firebase/firestore'

export function Rooms() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClose = () => setIsOpen(false)

  const [rooms, setRooms] = useState<RoomType[]>([])

  const handleOpenCreateRoom = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms')
      const roomsSnapshot = (await getDocs(
        roomsCollection,
      )) as QuerySnapshot<RoomType>
      const roomsList: RoomType[] = []
      roomsSnapshot.docs.forEach((doc: QueryDocumentSnapshot<RoomType>) => {
        roomsList.push(doc.data())
      })
      console.log('roomsList', roomsList)
      setRooms(roomsList)
    }

    fetchRooms()
  }, [])

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

      {rooms.map((room: RoomType, index) => (
        <Room key={index} room={room} />
      ))}

      <CreateRoomModal handleClose={handleClose} isOpen={isOpen} />
    </div>
  )
}
