import React,{useState} from 'react';
export default function Testapi(){
    const [pimage,setpimage]=useState('');

    const sendImage=(event)=>{
      
        const data=new FormData();
        data.append("file",pimage)

        fetch('http://localhost:8000/saveimage', {
          method: 'POST',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
          console.log(body)
          });
        });       
          }
      


 return(
    <div className="testfile">
    <input type="file" name="upfile" id="testfile"
    
    onChange={event =>{
      const file=event.target.files[0];
      setpimage(file);
  }}
    
    
    />

    <button
    onClick={()=>{sendImage()}}
    
    >Send for prediction</button>
  </div>
 )   
}