import React from "react"
import axios from 'axios';
import {Notification } from "./Notification.js";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {

    const [ToDoList, setToDoList] = React.useState();
    const [account, setAccount] = React.useState('');
    const [JWT,setJWT]=React.useState(null)

    React.useEffect(()=>{
      if (window.localStorage.getItem('listApp-token')!=null&window.localStorage.getItem('listApp-user')!=null){
        setJWT('JWT '+window.localStorage.getItem('listApp-token'))
        setAccount(window.localStorage.getItem('listApp-user'))
      }else{
        setJWT(null)
        setAccount('')
      }
    },[])

    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };


    const fetchAuthentication = async () => {
      let data = null;
      try {
        const response = await axios({
          method: "get",
          url:"http://172.16.99.113:81/samplelist/account/authentication",
          // url:"http://127.0.0.1:8000/samplelist/account/authentication",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":JWT,
          },
        });

        data = response.data;
        setAccount(data['user'])

      } catch (error) {
          Notification('error','認證失效')
          fetchLogout()
      }
      return data;
    };


    const fetchGetList = async () => {
      let data = null;
      try {
        const response = await axios({
          method: "get",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchGetList",
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchGetList",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        data = response.data;

      } catch (error) {
          Notification('error',error.message)
      }
      return data;
    };

    const fetchCompletedList = async () => {
      let data = null;
      try {
        const response = await axios({
          method: "get",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchCompletedList",
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchCompletedList",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        data = response.data;
      } catch (error) {
          Notification('error', error.message);
      }
      return data;
    };

    const fetchLogin=async(account,password)=>{
      let data=null
      try {
        const response = await axios({
          method: "post",
          url:"http://172.16.99.113:81/samplelist/account/login",
          // url:"http://127.0.0.1:8000/samplelist/account/login",
          headers: headers,
          data: {"username":account,"password":password},
        });

        data = response.data;

        if (data['success']==true){
          window.localStorage.setItem('listApp-token',data['access_token'])
          window.localStorage.setItem('listApp-user',data['user']['username'])
          setAccount(data['user'])
          setJWT('JWT '+window.localStorage.getItem('listApp-token'))
          Notification('success','login success')
          window.location.href = '/#/inProcess';
        }else{
          window.localStorage.removeItem('listApp-token')
          window.location.href = '/#/login';
        }
      } catch (error) {
          Notification('error', 'Login Fail');
          fetchLogout()
      }
    }

    const fetchLogout=()=>{
      setAccount('')
      setJWT(null)
      window.localStorage.removeItem('listApp-token')
      window.localStorage.removeItem('listApp-user')
      window.location.href = '/#/inProcess';
    }

    const fetchUploadFile=async(myfile,list)=>{

      const dataForm =new FormData();
      let data = null;
      dataForm.append("name",list['name']);
      dataForm.append("date",list['date']);
      dataForm.append("num",list['num']);
      dataForm.append("file",list['file']);
      dataForm.append("commit",list['commit']);
      dataForm.append("important",list['important']);
      dataForm.append("complete",list['complete']);
      dataForm.append("product",myfile);

      try {
        const response = await axios({
          method: "post",
          url:"http:///172.16.99.113:81/samplelist/mylist/api/fetchUploadFile",
          // url:"http:///127.0.0.1:8000/samplelist/mylist/api/fetchUploadFile",
          headers: {"Content-Type": "multipart/form-data"},
          data:dataForm,
        });
        data = response.data;

      } catch (error) {
          throw new Error(error.message);
      }

      return data;
    }

    const fetchComplete=async(list,user,start,end)=>{
      let data=null
      try{
        const response = await axios({
          method: "patch",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchComplete/"+list["id"],
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchComplete/"+list["id"],
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":JWT},
          data: {'done_user':user,'startTime':start,'endTime':end}
        });

        data=response.data
      }catch(error){
        Notification('error',error.message)
        fetchLogout()
      }
      return data;
    }

    const fetchQuit=async(list)=>{
      let data=null

      try{
        const response = await axios({
          method: "delete",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchQuit/"+list,
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchQuit/"+list,
          headers: headers,
        });

        data=response.data
      }catch(error){
        Notification('error',error.message)
      }
      return data;
    }

    const fetchUpdataData=async(list)=>{
      let data=null
      try{
        const response = await axios({
          method: "patch",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchUpdataData/"+list["id"],
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchUpdataData/"+list["id"],
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":JWT},
          data: list
        });

        data=response.data
      }catch(error){
        Notification('error',error.message)
        fetchLogout()
      }
      return data;
    }

    const fetchDownloadExcel=async(list)=>{
      let data=null

      try{
        const response = await axios({
          method: "POST",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchDownloadExcel",
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchDownloadExcel",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":JWT},
          responseType:'arraybuffer',
          data:list
        });

        let disposition = response.headers["content-disposition"];
        let filename = decodeURI(disposition.replace("attachment;filename=", "") );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

      }catch(error){
        throw new Error('error : Please login or checkup the server!')
      }
    }

    const fetchDownloadFile=async(list)=>{
      let data=null

      try{
        const response = await axios({
          method: "POST",
          url:"http://172.16.99.113:81/samplelist/mylist/api/fetchDownloadFile",
          // url:"http://127.0.0.1:8000/samplelist/mylist/api/fetchDownloadFile",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":JWT},
          responseType:'arraybuffer',
          data:list
        });

        let disposition = response.headers["content-disposition"];
        let filename = decodeURI(disposition.replace("attachment;filename=", "") );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

      }catch(error){
        if (error.response.status==403){
          Notification('error','Please login...')
        }else{
          Notification('error',error.response.status)
        }
        fetchLogout()
      }
    }

    /////////////////////////////////////////////////////

    return (
      <AppContext.Provider
        value={{
            ToDoList,
            setToDoList,
            fetchGetList,
            fetchUploadFile,
            fetchComplete,
            fetchQuit,
            fetchUpdataData,
            fetchDownloadFile,
            account,
            fetchLogin,
            fetchLogout,
            fetchAuthentication,
            fetchCompletedList,
            fetchDownloadExcel,
        }}
      >{children}
      </AppContext.Provider>
    );
};

export { AppContext, AppProvider };