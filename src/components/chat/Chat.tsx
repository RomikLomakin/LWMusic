import { useEffect, useState } from 'react'

import { auth, db } from '@/firebase.ts'
import { Button, IconButton, InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'
import { format } from 'date-fns'
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'

import { MessagesList } from '@/components/chat/MessagesList.tsx'
import { SendIcon } from '@/components/icons/SendIcon.tsx'

export function Chat() {
  const [users, setUsers] = useState<Record<string, any>>({})
  const [messages, setMessages] = useState<Array<any>>([])
  const [text, setText] = useState('')

  const sendMessage = async (text: string) => {
    if (text.trim() === '') return

    const user = auth.currentUser
    if (user) {
      // Добавляем сообщение в локальное состояние для мгновенного отображения
      const newMessage = {
        formattedTimestamp: format(new Date(), 'HH:mm'),
        id: `${user.uid}-${new Date().getTime()}`,
        text,
        timestamp: new Date(),
        uid: user.uid,
      }
      setMessages(prevMessages => [...prevMessages, newMessage])

      // Отправляем сообщение в Firestore
      await addDoc(collection(db, 'messages'), {
        text,
        timestamp: serverTimestamp(),
        uid: user.uid,
      })
    }
  }

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(text)
    setText('')
  }

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'))
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const msgs: any = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        const timestamp = data.timestamp
          ? data.timestamp.toDate
            ? data.timestamp.toDate()
            : data.timestamp
          : null
        const formattedTimestamp = timestamp
          ? format(timestamp, 'HH:mm')
          : 'Unknown time'
        msgs.push({
          id: doc.id,
          ...data,
          formattedTimestamp,
        })
      })
      console.log('msgs', msgs)
      setMessages(msgs)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Подгрузка информации о пользователях
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users')
      const querySnapshot = await getDocs(usersCollection)
      const usersData: Record<string, any> = {}
      querySnapshot.forEach(doc => {
        usersData[doc.id] = doc.data()
      })
      console.log('usersData', usersData)
      setUsers(usersData)
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex flex-col pt-6 pb-2 px-2 h-1/2 bg-gray-block rounded-[20px]">
      <h2 className="font-ultrabold text-[28px] mb-4">Чат</h2>

      <div className="flex flex-col justify-between h-full flex-1 min-h-0">
        <MessagesList messages={messages} users={users} />

        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!text}
                  onClick={handleSubmitMessage}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <SendIcon className="fill-accent" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          label="Введите текст"
          onChange={e => setText(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '16px' }}
          value={text}
          variant="filled"
        />
      </div>
    </div>
  )
}
