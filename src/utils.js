export async function getAiTextResponse(url, messages) {
    //  messages is the array of type object {role:"assistant" | "user", content:string} but it might contain additional property. To filter it out above map was written
    const filteredMessages = messages.map((message)=>({role:message.role, content:message.content}))
    //  messages is the array of type object {role:"assistant" | "user", content:string}
    console.log(url)
    // throw new Error("Hello")
    const response = await fetch(`${url}/chatcomplition`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages:filteredMessages })
    });
    if (!response.ok) {
        alert(response.statusText);
        throw new Error(response.statusText)
    }
    return response.json()
}

export async function getImageInfo(url, fileInputElement) {

    const file = fileInputElement.files[0]
    console.log(file)
    if (!file.type.startsWith('image/')) {
        alert("Supports only Image file")
        return null
    }
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${url}/imageinfo`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        alert(response.statusText);
        throw new Error(response.statusText)
    }
    return response.json()
}

export function generateBlobURL(fileInputElement) {
    const file = fileInputElement.files[0]

    if (file) {
        return URL.createObjectURL(file)
    }


    return null

}


export function generatePromptOnGivenUserInfo(imageInfo) {
    return `
I have an image with the following details: 

- Caption: "${imageInfo.caption}"
- Detected objects: ${JSON.stringify(imageInfo.objects)}
- Text content in the image: "${imageInfo.textInfo.content}" (Confidence level: ${imageInfo.textInfo.confidence} out of 100)

Can you help summarize this image or provide additional insights based on the information?
`
}