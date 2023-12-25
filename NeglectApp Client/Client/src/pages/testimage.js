import React, { useState } from "react";
import axios from "axios";
export default function Testimg(){
const [pimage,setpimage]=useState('');
    const sendImage=(event)=>{
const data=new FormData();
data.append("myImage",pimage)
console.log(data)
axios.post('/guardian/updateprofileimage',data)
.then(res=>console.log(res.data.filepath))
.catch(err=>console.log(err))

    }
return(
    <div>
        <h1>Hello from Test Image</h1>



<form action="">

    <input type="file" 
    
    onChange={event =>{
        const file=event.target.files[0];
        setpimage(file);
    }}
    
    
    />
</form>
<button
onClick={sendImage}
>Send Image</button>

<div>
    <img src="http://localhost:5000/uploads/myImage-1643627542195.png" alt="" />
</div>


    </div>
)
}