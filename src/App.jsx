import { useEffect, useRef, useState } from 'react'

import './App.css'
import { generateBlobURL, generatePromptOnGivenUserInfo, getAiTextResponse, getImageInfo } from './utils'
import RenderMessage from './components/RenderMessage'

function App() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [urlImage, setUrlImage] = useState(null)
  const inputRef = useRef()
  const inputFileRef = useRef()

  window.messages = messages // To access  messages array in browser console for debugging

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
    .catch(()=>{
      setMessages(prev=>prev.concat([{role:'assistant', content:''}]))
      setLoading(false)
    })
    

  }, [messages])

  const handelSendButton = async () => {
    console.log(inputFileRef.current.files)
    if (inputFileRef.current.files[0]) {
      setUrlImage(null)
      inputRef.current.value = ''
      setLoading(true)
      const imageInfo = await getImageInfo(import.meta.env.VITE_BACKENDURL ,inputFileRef.current)
      const imageURL = generateBlobURL(inputFileRef.current)
      if(imageInfo.error){
        inputFileRef.current.value = ''
        setLoading(false)
        alert(imageInfo.error.message)
        return
      }

      const userPrompt = generatePromptOnGivenUserInfo(imageInfo)
      const newMessage = {
        role:'user',
        content:userPrompt,
        urlToImage:imageURL
      }
      inputFileRef.current.value = ''
      setMessages(prev=>prev.concat([newMessage]))
      return
    }

    setMessages(prev => prev.concat({ role: 'user', content: inputRef.current.value }))

  }

  function handelFileInput(event){
    if(event.target.files[0]){
      const imageURL = generateBlobURL(event.target)
      setUrlImage(imageURL)
    }
  }


  return (
    <>
      <div>
        <h1>SnapTalk</h1>

        <div className="message-container" style={{ height: '90vh', width: '100vw', margin: '30px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          {messages.map(message =>
            <RenderMessage key={message.content} {...message} />
          )
          }
        </div>
        {/* <div  >Loading.......</div> */}
        {loading && <div style={{ position: 'fixed', bottom: '60px', left: '0' }}  >Loading.......</div>}

          {urlImage && <img width={100} height={70} src={urlImage} alt="currentImage"  style={{ position: 'fixed', bottom: '50px', right: '0' }}/>}
        <div style={{ position: 'fixed', bottom: '0', left: '0' }}>
          
          <input disabled={urlImage} ref={inputRef} style={{ height: '30px', width: '80vw' }}></input>
          <button disabled={loading} onClick={handelSendButton}>Send</button>
          <button disabled={loading} onClick={() => inputFileRef.current.click()}>UploadImage</button>

          <input onChange={handelFileInput} ref={inputFileRef} type="file" style={{ display: 'none' }} />
        </div>


      </div>
    </>
  )
}

export default App
