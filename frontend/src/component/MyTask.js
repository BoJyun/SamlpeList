import React ,{ useState, useEffect,createContext,useContext }from "react"
import AddTask from "./AddTask"
import "./css/MyTask.css"

const MyTasks=()=>{

    const [ReList,setReList]=useState(false)

    useEffect(()=>{
        if (ReList==true){
            setReList(false)
        }
    })

    const initialize=()=>{
        setReList(true)
    }

    return(
        <div class="InputTasksForm">
            <AddTask onSuccess={initialize}/>
        </div>
    )
}

export default  MyTasks;