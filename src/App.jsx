import { useEffect, useRef, useState } from 'react'

import './App.css'
import { getAiTextResponse } from './utils'

function App() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()

  window.messages = messages

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]

    if (!lastMessage || lastMessage.role === 'assistant') return

    inputRef.current.value = ''

    setLoading(true)
    getAiTextResponse(import.meta.env.VITE_BACKENDURL, messages).
      then((res) => {
        setMessages(prev => prev.concat([res]))
        setLoading(false)
      })
    // console.log("Why i am executing")

  }, [messages])

  const handelSendButton = () => {
    setMessages(prev => prev.concat({ role: 'user', content: inputRef.current.value }))

  }



  return (
    <>
      <div>
        <h1>Welcome to this dummy chat app with AI </h1>

        <div className="message-container" style={{ height: '90vh', width: '100vw', margin: '30px' , display:'flex', flexDirection:'column', alignItems:'start'}}>
          {messages.map(message =>
            <div key={message.content}>
              
              <strong className="message">{message.role}:</strong>
              <span>{message.content}</span>
              
            </div>)
          }
        </div>
        {/* <div  >Loading.......</div> */}
        {loading && <div style={{ position: 'fixed', bottom: '60px', left: '0' }}  >Loading.......</div>}

        <div style={{ position: 'fixed', bottom: '0', left: '0' }}>
          <input ref={inputRef} style={{ height: '30px', width: '80vw' }}></input>
          <button disabled={loading} onClick={handelSendButton}>Send</button>
        </div>


      </div>
    </>
  )
}

export default App
