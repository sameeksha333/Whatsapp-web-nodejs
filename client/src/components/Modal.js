import React from "react";
import './Modal.css'
import axios from 'axios';
import { useEffect, useState } from "react";

var QRCode = require("qrcode.react");

const  Modal= props =>{
  
  const[qrCode,setqrCode] = useState("");

  useEffect(() => {
    getQrCode();
    setInterval(getQrCode(), 5000);
  }, []);

  const refreshPage=()=>{
    window.location.reload(false);
  }

  const getQrCode =()=>{
    axios.get("http://localhost:3001/qrdata").then((response) => {
      setqrCode(response.data);
      console.log(qrCode);
    }).catch((err)=>{
      console.log(err)
    });
  }

    if(!props.show){
        return null;
    }


  return(
    <>
      <div className="modal">
       <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
              <h4>Scan this Qr code to send whatsapp</h4>
              <QRCode style={{height:"50vh",width:"50vh",alignContent:"center"}} value={qrCode} />   
            </div>
            <div className="modal-body">
                Modal content
            </div>
            <div className="modal-footer">
              <button onClick={props.onClose}>Close</button>
             
            </div>
        </div>
       </div>
      </div>
      </>
  );

}

export default Modal;