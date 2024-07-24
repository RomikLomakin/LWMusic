import { Message } from '@/components/chat/Message.tsx'

export function MessagesList({ messages, users }) {
  return (
    <div className="flex flex-col gap-y-2 mb-3 overflow-y-auto">
      {messages.map(message => (
        <Message key={message.id} message={message} user={users[message.uid]} />
      ))}
    </div>
  )
}
