import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
// import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
export default function RenderMessage({ role, content, urlToImage }) {
    // const [paused, setPaused] = useState(true)

    // useEffect(()=>{
    //     const utterance = new SpeechSynthesisUtterance(content)
    //     if(!urlToImage && !paused){
    //         if(speechSynthesis.paused){
    //             speechSynthesis.resume()
    //             return
    //         }
    //         speechSynthesis.speak(utterance)
    //     }
    //     else{
    //         speechSynthesis.pause()
    //     }
    // },[paused])

    if (urlToImage) {
        return <div>
            <strong className="message">{role}:</strong>
            <img src={urlToImage} width={100} height={60} alt="uploaded_image" />
        </div>

    }
    return (

        <div>
            <strong className="message">{role}:</strong>
            <Markdown
                components={{
                    a: (props) => <a {...props} target='_blank' rel='noopener noreferrer' />
                    
                }}

                remarkPlugins={[remarkGfm]}
                className={'markdown-editor'}
            >{content}</Markdown>
            {/* <button style={{marginLeft:'20px'}} onClick={()=>setPaused(!paused)}>
                <img
                    height={10}
                    width={10}
                    src={paused ? '/play.svg' : '/pause.svg'}
                    alt={paused ? 'pause' : 'play'}
                />
            </button> */}
        </div>

    )
}
