import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
//import '../bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/Modal';
import axios from 'axios';
import { useEffect, useState } from "react";
var QRCode = require("qrcode.react");
//var RNFS = require('react-native-fs');

function App() {

  const[show,setShow] = useState(true);
  const[qrCode,setqrCode] = useState("");
  const[status,setStatus] = useState("");
  const[msg1,setmsg1] = useState("");
  
  useEffect(() => {
    getQrCode();
    getAuth();
  }, []);

  const getQrCode =()=>{
    axios.get("http://localhost:3001/qrdata").then((response) => {
      setqrCode(response.data);
      if(response.data.error){
        setShow(false);
      }
    }).catch((err)=>{
      console.log(err)
    });
  }

  const getAuth =()=>{
    axios.get("http://localhost:3001/auth").then((response) => {
      setStatus(response.data);
      if(status==="ClientReady"){
        setShow(false)
      }
    }).catch((err)=>{
      console.log(err)
    });
  }

  const Submit = (e)=>{
    e.preventDefault();
    const sendData ={msg1:msg1};
    console.log(sendData);
    axios.post("http://localhost:3001/send_msg",sendData).then((response)=>{
     console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
    
    <div className="App">
    {show===true && (
      <>
       <QRCode style={{height:"50vh",width:"50vh",alignContent:"center"}} value={qrCode} /> 
      </>
    )
    } 
    <form onSubmit={(e)=>{Submit(e)}}>
    <label>Text Message</label>
    <input name="msg1" onChange={(e)=>{setmsg1(e.target.value)}} type="text"/>
    <button type="submit">Submit</button>
    </form>
    </div>
    </>
  );
}

export default App;
