/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable eqeqeq */
import React,{ useState, useEffect,createContext,useContext} from "react"
import "./css/list.css"
import CheckTask from "./CheckTask"
import InputTask from "./InputTask"
import { AppContext } from './data';
import * as antd from 'antd';
import { Modal, Button, Input,TimePicker  } from 'antd';

const List=(props)=>{

    const [listState,setlistState]=useState({
            listData:props.listData,
            important:props.listData.important,
            complete:props.listData.complete,
            editTasks:null
        });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uerComplete, setUerComplete] = useState();
    const [restart,setRestart]=useState(false);
    const appCtx = React.useContext(AppContext);
    const list=React.useRef();

    useEffect(()=>{
        setlistState({...listState,
            listData:props.listData,
            important:props.listData.important,
            complete:props.listData.complete});

        if (restart){
            setRestart(false)
        }

    },[restart,props]);

    const changeState=(type,event)=>{
        let updateIm=null
        switch (type){
            case "complete":{
                setlistState({
                    ...listState,
                    complete:event.target.checked
                });
                break;
            }
            case "important":{
                if (listState.important==''){
                    setlistState({
                        ...listState,
                        important:'Y'
                    })
                    updateIm='Y'
                }
                else{
                    setlistState({
                        ...listState,
                        important:''
                    })
                    updateIm=''
                }
                break;
            }
        }

        appCtx.fetchUpdataData({"id":listState["listData"]["id"],"important":updateIm})
        props.onSuccess()

    }

    const initialize=()=>{
        setRestart(true)
    }

    const openEdit=(event)=>{
        if (event.target.className.indexOf('fa-user-edit') === -1 &&
            event.target.className.indexOf('taskChk') === -1){
            setlistState({
                ...listState,
                editTasks:(<InputTask listData={listState.listData} closeAdd={closeEdit} changeState={changeState} onSuccess={initialize} process={true}/>)
            })

            list.current.style.display='none'
        }
    }

    const closeEdit=()=>{
        list.current.style.display = ''
        setlistState({
            ...listState,
            editTasks:null
        })
    }

    const completeBtn=(list)=>{
        setIsModalVisible(true);
    }

    const QuitBtn=(list)=>{
        var result=window.confirm("確定要刪除"+list["name"]+'?');
        if (result){
            appCtx.fetchQuit(list["id"])
            props.onSuccess()
        }
    }

    const handleOk = () => {
        if (window.document.getElementById("user").value!=""&&window.document.getElementById("StartTime").value!=""&&
        window.document.getElementById("EndTime").value!="")
        {
            let user=window.document.getElementById("user").value
            let start=window.document.getElementById("StartTime").value
            let end=window.document.getElementById("EndTime").value
            appCtx.fetchComplete(listState.listData,user,start,end)
            props.onSuccess()
            setIsModalVisible(false);
        }else{
            window.alert("All the imput is required")
        }

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div class="listBlock">
                <div class={'list'+(listState.important == 'Y' ? ' important ' : '')} onClick={(event)=>openEdit(event)} ref={list}>
                    <input type="text" class={' taskTitle ' + (listState.complete ? ' complete ' : '') +(listState.important ? ' important ' : '') }
                            value={listState.listData.name}  />
                    <i class={listState.important == 'Y' ? ' fas fa-user-edit fa-lg iconImportant icon' : ' fas fa-user-edit fa-lg icon'}
                            onClick={()=>{
                                if (appCtx.account!=''){
                                    changeState('important')
                                    }
                                }}></i>
                    <input name="Quit" type="button" class="taskChk"  value="Quit" onClick={()=>QuitBtn(listState.listData)}/>
                    <input name="complete" type="button" class="taskChk"  disabled={appCtx.account==''?true:false} value="Complete" onClick={()=>completeBtn(listState.listData)}/>
                    <div class="listIcon">
                        {listState.listData.date != '' ?
                            <i class="far fa-calendar-alt icon"></i> : ''}
                        {listState.listData.date != '' ?
                            ` ${listState.listData.date.substring(5).replace('-', '/')} ` : ''}

                        {listState.listData.file != '' ?
                            <i class="fas fa-file icon"></i> : ''}

                        {listState.listData.commit != '' ?
                            <i class="far fa-comment-dots icon"></i> : ''}
                    </div>
                </div>
                <div>
                    {listState.editTasks}
                </div>
            </div>
            <Modal title="Complete Check" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input label="User" name="user" id="user" placeholder="Please input the User" />
                <br/><br/>
                <label >Start time :  <TimePicker format={'HH:mm'} id="StartTime"/></label>
                <br/><br/>
                <label >End time :  <TimePicker format={'HH:mm'} id="EndTime"/></label>
            </Modal>
        </>
    )
}

export default List;





