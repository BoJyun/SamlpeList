import React,{ useEffect} from "react"
import InputTask from "./InputTask"
import "./css/addTask.css"

const AddTask=(props)=>{

    const openAdd=()=>{
        document.getElementById('addTask').style.display='none'
        document.getElementById('inputTask').style.display=''
    }

    const closeAdd=()=>{
        document.getElementById('addTask').style.display=''
        document.getElementById('inputTask').style.display='none'
    }

    return(
        <div>
            <div>
                <input id="addTask" value=" ＋ Add Task" onClick={openAdd} type="button"/>
            </div>
            <div id="inputTask" style={{display:'none'}}>
                <InputTask closeAdd={closeAdd} onSuccess={props.onSuccess}/>
            </div>
        </div>
    )
}

export default AddTask