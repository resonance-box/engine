import { createSoundFont2Synthesizer } from '@resonance-box/synthesizers'
import { useState } from 'react'
import Worker from './worker.ts?worker'

const channel = new MessageChannel()
const worker = new Worker()

export default function App() {
  const [started, setStarted] = useState(false)

  function setup() {
    worker.postMessage({ type: 'connect' }, [channel.port1])
    const audioContext = new AudioContext()
    const url = new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)
    createSoundFont2Synthesizer(channel.port2, audioContext, url).then(() => {
      setStarted(true)
    })
  }

  return (
    <div>
      <button disabled={started} onClick={setup}>
        Start
      </button>
      <button
        disabled={!started}
        onClick={() => worker.postMessage({ type: 'play' })}
      >
        WASM Play
      </button>
      <button
        disabled={!started}
        onClick={() => worker.postMessage({ type: 'stop' })}
      >
        WASM Stop
      </button>
    </div>
  )
}
