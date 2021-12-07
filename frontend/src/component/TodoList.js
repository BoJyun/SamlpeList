/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect, createContext, useContext } from "react"
import List from "./list"
import { AppContext } from './data';


const TodoLists = (props) => {

    const appCtx2 = React.useContext(AppContext);
    const [list, setlist] = useState([]);
    const [restart, setRestart] = useState(false);

    const sendSocketMsg=()=>{
        props.socket.current.send(JSON.stringify({message:"changeData true"}))
    }

    useEffect(()=>{
        if (! props.socket||!props.socket.current){return};

        props.socket.current.onmessage=(e)=>{
            console.log("socket",e.data)
            setRestart(true)
        }
    })

    useEffect(() => {
        if (props.page=="completed"){
            appCtx2.fetchCompletedList().then(response => {
                setlist(response)
            })
        }else{
            appCtx2.fetchGetList().then(response => {
                setlist(response)
            })
        }
    }, [restart])

    useEffect(() => {
        if (restart) {
            setRestart(false)
        }
    }, [restart])

    const initialize = () => {
        if (props.socket){
            sendSocketMsg()
        };
        // sendSocketMsg()
        setRestart(true)
    }

    let Lists = list.map((item) => {
        switch (props.page) {
            case "inProgress": {
                if (item.complete)
                    return null
                break;
            }
            case "completed": {
                if (!item.complete)
                    return null
                break;
            }
        }

        return <List key={item.id} listData={item} onSuccess={initialize} />
    })

    return (
        <div>
            {Lists}
        </div>
    )
}

export default TodoLists;
