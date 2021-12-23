import React, { useState } from "react"
import TodoLists from"./TodoList.js"
import "./css/Completed.css"
import { AppContext } from './data';
import { Spin} from 'antd';

const InputName=({className,inputName})=>{

    return(
        <div class="inputName">
            <i class={className}></i> {inputName}
        </div>
    )
}

const Completed=()=>{
    const [date,setDate]=useState({startDate:'',endDate:''})
    const [spin,setSpin]=useState(false)
    const refData=React.useRef()
    const appCtx2 = React.useContext(AppContext);

    const closedata=()=>{
        setDate({startDate:'',endDate:''})
        refData.current.style.display = 'none'
    }

    const opendata=()=>{
        refData.current.style.display =''
    }

    const changeState=(e)=>{
        setDate({
            ...date,
            [e.target.id]:e.target.value
        })
    }

    const outputExcel=()=>{
        if (date.startDate==''||date.endDate==''){
            alert('input startDate and endDate')
        }else{
            setSpin(true)
            ayncFun()
        }
    }

    const ayncFun=async()=>{
        try{
            let res=await appCtx2.fetchDownloadExcel({'startDate':date.startDate,'endDate':date.endDate})
        }catch(error){
            alert(error.message)
        }finally{
            closedata()
            setSpin(false)
        }
    }

    return(
        <Spin tip="Loading..." spinning={spin} >
            <div class="InputTasksForm">
                <TodoLists page="completed" />
            </div>

            <div class="InputTasksForm2" >
                <div>
                    <input id="outputdata" value=" ＋ Output Excel"  type="button" onClick={opendata}/>
                </div>
                <div style={{display:'none'}} ref={refData}>
                    <div class="InputTaskData" >
                        <InputName className="fas fa-calendar-alt" inputName="StartDate" />
                        <div class="inputForm">
                            <input name="date" id="startDate" type="date" value={date.startDate} class="inputStyle inputDateTime" onChange={(e)=>{changeState(e)}}
                                    />
                        </div>
                        <InputName className="fas fa-calendar-alt" inputName="EndDate" />
                        <div class="inputForm">
                            <input name="date" id="endDate" type="date" value={date.endDate} class="inputStyle inputDateTime" onChange={(e)=>{changeState(e)}}
                                    />
                        </div>
                    </div>
                    <div>
                        <button type="button" class="addButton cancelButton" onClick={closedata}> Ｘ Cancel</button>
                        <button type="button" class="addButton saveButton" onClick={outputExcel}> ＋ Save</button>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default Completed;