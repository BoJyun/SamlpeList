/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
import React , { useState, useEffect}  from "react"
import InputTasksForm  from "./InputName.js";
import "./css/InputTask.css"
import { AppContext } from './data';
import { Spin} from 'antd';

const InputTask=(props)=>{

    const [Task,setTask]=useState({id:'',name:'',date:'',num:1,file:'',commit:'',important:'',process:false,complete:false});
    const [spin,setSpin]=useState(false)
    const appCtx = React.useContext(AppContext);

    useEffect(()=>{
        if (props.listData) {
            setTask({
                ...props.listData,
                process:props.process
            })
        }
    },[])

    const changeListState=(type,event)=>{
        if (props.changeState){
            props.changeState(type,event)
        }
        else{
            console.log('新增狀態所以沒有this.props.changeState')}
    }

    const filebox=React.useRef()
    const list=React.useRef()

    const changeState=(event)=>{

        let value=event.target.value;

        if (event.target.name=="file"){
            value=value.substring(value.lastIndexOf('\\')+1)
        }
        else if (event.target.name=="complete"){
            value=event.target.checked
            setTask((preState)=>({
                ...preState,
                complete:value
            }))
        }
        setTask((preState)=>({
            ...preState,
            [event.target.name]:value
        }))
    }

    const asyncFunc1=async(file,dict)=>{
        try{
            let res=await appCtx.fetchUploadFile(file,dict)
            alert(res['msg']);
        }catch(error){
            alert(error.message)
        }finally{
            setSpin(false)
            setTask({id:'',name:'',date:'',num:'',file:'',commit:''
            ,important:'',process:false,complete:false})
            filebox.current.value = ''
            props.closeAdd()
            props.onSuccess();
        }
    }

    const submitTodo=()=>{
        if (Task.name==''){
            alert('待辦事項名稱未輸入！')
        }else{
            if (filebox.current.files.length==0){
                alert('請附上zip檔')
            }else{
                setSpin(true)
                asyncFunc1(filebox.current.files[0],Task)
            }
        }
    }

    const downloadfile=()=>{
        appCtx.fetchDownloadFile(Task)
    }

    return(
    <>

        <Spin tip="Loading..." spinning={spin} >
            <div>
                <div class={Task.important=='Y'? "important inputTaskTitle":"inputTaskTitle"}  ref={list}>
                    <input name="name" type="text" class={"taskTitle"+(Task.completed ? 'complete' :'')}
                    value={Task.name} onChange={changeState} placeholder="Type Your ID Here…" />
                </div>
                <InputTasksForm closeAdd={props.closeAdd} stateData={Task} changeState={changeState} submitTodo={submitTodo} filebox={filebox} downloadfile={downloadfile}/>
            </div>
        </Spin>
    </>
    )
}

export default InputTask;
