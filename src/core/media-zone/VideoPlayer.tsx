import { useEffect, useState } from 'react'
import YouTube from 'react-youtube'

import { getDatabase, onValue, ref, set } from 'firebase/database'

export function VideoPlayer() {
  const [player, setPlayer] = useState<any>(null)
  // const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const db = getDatabase()
    const videoStatusRef = ref(db, 'video/status')

    // Listen for changes in the video status
    onValue(videoStatusRef, snapshot => {
      const data = snapshot.val()
      if (data === 'PLAY' && player) {
        player.playVideo()
      } else if (data === 'PAUSE' && player) {
        player.pauseVideo()
      }
    })
  }, [player])

  const onPlayerReady = (event: any) => {
    setPlayer(event.target)
  }

  const onPlay = () => {
    // setIsPlaying(true)
    const db = getDatabase()
    set(ref(db, 'video/status'), 'PLAY')
  }

  const onPause = () => {
    // setIsPlaying(false)
    const db = getDatabase()
    set(ref(db, 'video/status'), 'PAUSE')
  }

  return (
    <div className="h-[624px] bg-gray-block rounded-[20px]">
      <YouTube
        onPause={onPause}
        onPlay={onPlay}
        onReady={onPlayerReady}
        opts={{
          height: '390',
          playerVars: {
            autoplay: 0,
          },
          width: '640',
        }}
        videoId="dQw4w9WgXcQ"
      />
    </div>
  )
}
