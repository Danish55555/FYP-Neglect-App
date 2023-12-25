import React from 'react';


export const showErrorMessage=(msg)=>{
    return <div className="errormsg"
    
    style={{background:"red",padding:"20px"}}>{msg}</div>
}        

export const showSuccessMessage=(msg)=>{
    return <div className="successmsg" style={{background:"green",padding:"20px",color:"white"}}>{msg}</div>
}        