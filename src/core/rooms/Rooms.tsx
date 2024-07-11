import { useEffect, useState } from 'react'

import { Room } from '@/core/rooms/Room'
import { RoomType } from '@/core/rooms/types'
import { db } from '@/firebase.ts'
import {
  // Backdrop,
  Button,
  // Modal
} from '@mui/material'
// import { animated, useSpring } from '@react-spring/web'
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
} from 'firebase/firestore'

// import { SignUpFinish } from '@/components/authorization/SignUpFinish.tsx'

// interface FadeProps {
//   children: React.ReactElement
//   in?: boolean
//   onClick?: any
//   onEnter?: (node: HTMLElement, isAppearing: boolean) => void
//   onExited?: (node: HTMLElement, isAppearing: boolean) => void
//   ownerState?: any
// }

// const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
//   function Fade(props, ref) {
//     const {
//       children,
//       in: open,
//       onClick,
//       onEnter,
//       onExited,
//       ownerState,
//       ...other
//     } = props
//     const style = useSpring({
//       from: { opacity: 0 },
//       onRest: () => {
//         if (!open && onExited) {
//           onExited(null as any, true)
//         }
//       },
//       onStart: () => {
//         if (open && onEnter) {
//           onEnter(null as any, true)
//         }
//       },
//       to: { opacity: open ? 1 : 0 },
//     })
//
//     return (
//       <animated.div ref={ref} style={style} {...other}>
//         {React.cloneElement(children, { onClick })}
//       </animated.div>
//     )
//   },
// )
//
// const style = {
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   left: '50%',
//   p: 4,
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
// }

export function Rooms() {
  // const [open, setOpen] = useState(false)
  // const handleClose = () => setOpen(false)

  const [rooms, setRooms] = useState<RoomType[]>([])
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
    <div className="bg-white flex-1 rounded-[20px] px-10 py-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[38px] font-bold">Комнаты</h2>
        <Button variant="outlined">Создать комнату</Button>
      </div>

      {rooms.map((room: RoomType, index) => (
        <Room key={index} room={room} />
      ))}

      {/*<Modal*/}
      {/*  aria-describedby="spring-modal-description"*/}
      {/*  aria-labelledby="spring-modal-title"*/}
      {/*  closeAfterTransition*/}
      {/*  onClose={handleClose}*/}
      {/*  open={true}*/}
      {/*  slotProps={{*/}
      {/*    backdrop: {*/}
      {/*      TransitionComponent: Fade,*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  slots={{ backdrop: Backdrop }}*/}
      {/*>*/}
      {/*  <Fade in={true}>*/}
      {/*    <SignUpFinish />*/}
      {/*  </Fade>*/}
      {/*</Modal>*/}
    </div>
  )
}
