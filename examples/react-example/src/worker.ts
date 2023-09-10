import { createEngine } from '@resonance-box/engine'
import { v4 as uuidv4 } from 'uuid'

const engine = await createEngine()
const store = engine.getStore()

store.createSong('Song1', 120)
store.addTrack({ id: uuidv4(), events: [] })
const tracks = store.getTracks()
const trackId = tracks[0].id

store.addEvent({
  id: uuidv4(),
  kind: 'Note',
  ticks: 0,
  duration: 480,
  velocity: 100,
  noteNumber: 60,
  trackId,
})

store.addEvent({
  id: uuidv4(),
  kind: 'Note',
  ticks: 240,
  duration: 480,
  velocity: 100,
  noteNumber: 62,
  trackId,
})

store.addEvent({
  id: uuidv4(),
  kind: 'Note',
  ticks: 720,
  duration: 1080,
  velocity: 100,
  noteNumber: 65,
  trackId,
})

store.addEvent({
  id: uuidv4(),
  kind: 'Note',
  ticks: 1920,
  duration: 480,
  velocity: 100,
  noteNumber: 72,
  trackId,
})

// let port: MessagePort | undefined = undefined

self.addEventListener('message', (e) => {
  const data = e.data

  switch (data.type) {
    case 'connect':
      engine.setSynthesizerPort(e.ports[0])
      break
    case 'play':
      engine.play()
      break
    case 'stop':
      engine.stop()
      break
    default:
      console.log(e.data)
  }
})

export {}
