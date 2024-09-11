export async function getAiTextResponse(url, messages){
  //  messages is the array of type object {role:"assistant" | "user", content:string}
  console.log(url)
  // throw new Error("Hello")
    const response = await fetch(`${url}/chatcomplition`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages})
    });
    if (!response.ok) {
       alert(response.statusText);
       throw new Error(response.statusText)
    }
    return response.json()
}