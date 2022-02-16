import React from "react"
import "./css/InputName.css"
import { AppContext } from './data';
import { Spin} from 'antd';

const InputName=({className,inputName})=>{

    return(
        <div class="inputName">
            <i class={className}></i> {inputName}
        </div>
    )
}

const InputTaskForm=({closeAdd,stateData,changeState,submitTodo,filebox,downloadfile})=>{

    let fileButton;
    let fileDownload;

    if (stateData.process){
        fileButton=<span class="inputStyle">{stateData.file}</span>
        fileDownload=<button type="button" class="addButton saveButton" onClick={downloadfile}>FileDownload</button>
    }else{
        fileButton=<input name="file" type="file" accept=".zip,.7z" class="inputStyle" ref = {filebox} onChange = {(event)=>{changeState(event)}}/>
        fileDownload=<button type="button" class="addButton saveButton" onClick={submitTodo}> ＋ Save</button>
    }

    return(
                <div class="InputTasksForm">
                    <div class="InputTask">
                        <InputName className="fas fa-address-card" inputName="Project" />
                        <div class="inputForm">
                            <input name="project" type="text" class="inputStyle inputProject"
                                        value={stateData.project} onChange = {changeState}/>
                        </div>
                        <InputName className="fas fa-calendar-alt" inputName="Deadline" />
                        <div class="inputForm">
                            <input name="date" type="date" class="inputStyle inputDateTime"
                                    value={stateData.date} onChange = {changeState}/>
                        </div>
                        <InputName className="fa fa-calculator" inputName="Quantity " />
                        <div class="inputForm">
                            <input name="num" type="number" class="inputStyle inputNumber"  min="1"
                                        value={stateData.num} onChange = {changeState}/>
                        </div>
                        <InputName className="fas fa-file" inputName="File" />
                        <div class="inputForm">
                            {fileButton}
                        </div>
                        <InputName className="far fa-comment-dots" inputName="Comment" />
                        <div class="inputForm">
                            <textarea name="commit" rows="6" cols="55" class="inputStyle" value = {stateData.commit} onChange = {changeState}>
                            </textarea>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="addButton cancelButton" onClick={closeAdd}> Ｘ Cancel</button>
                        {fileDownload}

                    </div>
                </div>
    )
}


export default InputTaskForm;