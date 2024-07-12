import React, { useState } from 'react'
import ReactFileReader from 'react-file-reader'

import { Backdrop, Box, Button, CircularProgress, Modal } from '@mui/material'
import TextField from '@mui/material/TextField'
import { animated, useSpring } from '@react-spring/web'

interface FadeProps {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props
    const style = useSpring({
      from: { opacity: 0 },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true)
        }
      },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true)
        }
      },
      to: { opacity: open ? 1 : 0 },
    })

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    )
  },
)

const style = {
  backgroundColor: '#ECEDF2',
  borderRadius: '20px',
  boxShadow: 24,
  left: '50%',
  padding: '40px',
  position: 'absolute' as 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 555,
}

export function CreateRoomModal({
  handleClose,
  isOpen,
}: {
  handleClose: () => void
  isOpen: boolean
}) {
  const [roomName, setRoomName] = useState('')
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')

  const handleFiles = files => {
    console.log(files)
    setUrl(files.base64)
  }

  return (
    <Modal
      aria-describedby="spring-modal-description"
      aria-labelledby="spring-modal-title"
      closeAfterTransition
      onClose={handleClose}
      open={isOpen}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
      // slots={{ backdrop: Backdrop }}
    >
      <Fade in={isOpen}>
        <Box component="form" sx={style}>
          <h2 className="font-ultrabold text-4xl mb-4">Создание комнаты</h2>
          <div className="flex flex-col gap-y-3 mb-6">
            <div className="">
              <span>Придумайте название</span>
              <TextField
                fullWidth
                label="Название комнаты"
                onChange={e => setRoomName(e.target.value)}
                sx={{
                  '&.MuiFilledInput': {
                    backgroundColor: 'white',
                  },
                  borderRadius: '16px',
                }}
                value={roomName}
                variant="filled"
              />
            </div>

            <div className="">
              <span>Выберите категории видео (не более трёх)</span>
              {/*<TextField*/}
              {/*  fullWidth*/}
              {/*  label="Пароль"*/}
              {/*  onChange={e => setPassword(e.target.value)}*/}
              {/*  type="password"*/}
              {/*  value={password}*/}
              {/*  variant="filled"*/}
              {/*/>*/}
            </div>

            <div className="flex">
              <div className="w-28 h-28 rounded-[10px] overflow-hidden mr-5">
                <img
                  alt="Avatar Placeholder"
                  className="w-full h-full object-cover"
                  src={url}
                />
              </div>

              <div className="flex flex-col gap-2">
                <ReactFileReader
                  base64={true}
                  fileTypes={['.png', '.jpg']}
                  handleFiles={handleFiles}
                >
                  <Button className="w-full mb-2" variant="outlined">
                    Загрузить обложку
                  </Button>
                </ReactFileReader>

                <Button
                  className="w-full"
                  onClick={() => setUrl('')}
                  variant="outlined"
                >
                  Удалить
                </Button>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            // onClick={handleRegister}
            variant="filled"
          >
            {loading ? (
              <CircularProgress color="inherit" size={22} />
            ) : (
              'Готово'
            )}
          </Button>
        </Box>
      </Fade>
    </Modal>
  )
}
