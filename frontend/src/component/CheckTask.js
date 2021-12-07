/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
import React , { useState, useEffect,useContext}  from "react"
import InputTasksForm  from "./InputName.js";
import "./css/InputTask.css"
// import {ListData} from "./data.js"
import { AppContext } from './data';
import { Button } from 'antd';

const CheckTask=(props)=>{

    const [Task,setTask]=useState({id:'',name:'',date:'',time:'',file:'',commit:'',important:'',complete:false});
    const appCtx = React.useContext(AppContext);

    useEffect(()=>{
        if (props.listData) {
            setTask(props.listData)
        }
    },[])

    const changeListState=(type,event)=>{
        if (props.changeState){
            console.log("dodo")
            props.changeState(type,event)
        }
        else{
            console.log('新增狀態所以沒有this.props.changeState')}
    }

    // const filebox=React.createRef();
    const filebox=React.useRef()
    const list=React.useRef()

    const changeState=(event)=>{

        let value=event.target.value;
        if (event.target.name=="file"){
            value=value.substring(value.lastIndexOf('\\')+1)
        }
        else if (event.target.name=="complete"){
            value=event.target.checked
            // changeListState('complete',event)
            setTask((preState)=>({
                ...preState,
                complete:value
            }))
        }
        // console.log(Task)
        setTask((preState)=>({
            ...preState,
            [event.target.name]:value
        }))
        // console.log(Task)
    }

    const tagImportant=()=>{
        if (Task.important==''){
            setTask((preState)=>({
                ...preState,
                important:'Y'
            }))
        }
        else{
            setTask((preState)=>({
                ...preState,
                important:''
            }))
        }

        // changeListState('important')
    }

    const submitTodo=()=>{
        const a=filebox.current.files[0]
        if (Task.name==''){
            alert('待辦事項名稱未輸入！')
        }else{
            if (Task.id==""){
                let numId=appCtx.ToDoList.length+1;
                appCtx.setToDoList([
                    ...appCtx.ToDoList,
                    {...Task,id:numId}
                ]);
                props.onSuccess();
                alert('成功新增！');

            }
            else{
                let newState=appCtx.ToDoList.slice(0)
                for (let i=0;i<=newState.length-1;i++){
                    if (newState[i].id==Task.id){
                        newState.splice(i,1,Task)
                        break;
                    }
                }
                appCtx.setToDoList(newState)
                props.onSuccess();
                alert('編輯成功！')
            }

            appCtx.fetchUploadFile(a)
            props.closeAdd()
            setTask({id:'',name:'',date:'',time:'',file:'',commit:''
            ,important:'',complete:false})
            filebox.current.value = ''
        }
    }

    return(
        <div>
            <div class={Task.important=='Y'? "important inputTaskTitle":"inputTaskTitle"}  ref={list}>
                {/* <input name="complete" type="button" class="taskChk"  value="我是按鈕"/> */}
                {/* <Button size={'small'} className="taskChk">Complete</Button> */}
                <input name="name" type="text" class={"taskTitle"+(Task.completed ? 'complete' :'')}
                value={Task.name} onChange={changeState} placeholder="Type Something Here…" />
                {/* <i class={Task.important=='Y'?"fas fa-star fa-lg icon iconImportant":'far fa-star fa-lg icon'} onClick={tagImportant}></i> */}
                {/* <i class="fas fa-pen fa-lg icon icon_edit"></i> */}
            </div>
            <InputTasksForm closeAdd={props.closeAdd} stateData={Task} changeState={changeState} submitTodo={submitTodo} filebox={filebox}/>
        </div>
    )
}

export default CheckTask;
