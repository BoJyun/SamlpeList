/* eslint-disable no-lone-blocks */
import React from "react";
import * as ReactRouterDOM from 'react-router-dom';
import "./css/TopBlock.css"
import { AppContext } from './data';


const BookMark=({path_to,name})=>{

    const appCtx = React.useContext(AppContext);

    return(
        <ReactRouterDOM.Route exact path={path_to}
            children={props=>{
                let className=""
                if (path_to=="/logout" ){
                    className="booklogin"
                    return(
                    <button class={className} onClick={()=>{appCtx.fetchLogout()}}>{name}</button>
                    )
                }else if (path_to=="/login"){
                    className="booklogin"
                    return(
                    <ReactRouterDOM.Link to={path_to}>
                        <button class={className}>{name}</button>
                    </ReactRouterDOM.Link>
                )}
                else{
                    className="bookMark"
                    props.match?className += " select_bookMark":className="bookMark"

                    return(
                    <ReactRouterDOM.Link to={path_to}>
                        <button class={className}>{name}</button>
                    </ReactRouterDOM.Link>
                )}
        }}/>
    )
}


const TopBlock=()=>{

    const appCtx = React.useContext(AppContext);
    const [account,setAccount]=React.useState('')

    React.useEffect(()=>{
        if (appCtx.account!=''){
            setAccount(appCtx.account)
        }else{
            setAccount('')
        }
    })

    return(
        <div id="topBlock">
                <div>
                    <BookMark path_to="/" name="My Tasks"/>
                    <BookMark path_to="/inProcess" name="In Process"/>
                    <BookMark path_to="/completed" name="Completed"/>
                </div>
                <div class="b">
                    {account==''? <BookMark path_to="/login" name="login"/>:<BookMark path_to="/logout" name="logout"/>}
                </div>

        </div>
    );
};



export default TopBlock;