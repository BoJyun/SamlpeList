import React from "react"
import TodoLists from"./TodoList.js"
import "./css/MyTask.css"

const InProcess=()=>{

    const ws=React.useRef(null)

    React.useEffect(()=>{
        // ws.current = new WebSocket("ws://172.16.99.113:81/samplelist/ws/mylist/");
        ws.current = new WebSocket("ws://127.0.0.1:8000/samplelist/ws/mylist/");
        ws.current.onopen=()=>{
            console.log('websocket link success')
        }
        ws.current.onerror=(error)=>{
            console.error("WebSocket error observed:", error);
        }

        return (()=>{
            ws.current.close()
       })
    },[])

    React.useEffect(()=>{
        setTimeout(()=>window.location.reload(),2400000)
    },[])

    const sendSocketMsg=()=>{
        ws.current.send(JSON.stringify({message:"changeData true"}))
    }

    return(
        <div class="InputTasksForm">
            <TodoLists page="inProgress" socket={ws}/>
        </div>
    )
}

export default InProcess;