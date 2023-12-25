import React, {useState} from "react";
import axios  from "axios";

import { isEmail } from "../../../utils/Validation";
import { showErrorMessage, showSuccessMessage } from "../../../utils/Notification";


const initialState={
    email:'',
    err:'',
    success:''
}


function ForgetPassword(){
const [data,setData]=useState(initialState);
const {email,err,success}=data;

const handleChangeInput=e=>{
    const {name,value}=e.target;
    setData({...data,[name]:value,err:'',success:''})

}

const forgotPassword=async ()=>
{

    if(!isEmail(email)){
        return   setData({...data,err:'Enter a valid email Please',success:''})
    }
    console.log('Hello there')
        try{
                const res=await axios.post('/user/forgot',{email})
                return  setData({...data,err:'',success:res.data.msg})

        }
        catch(err){
            err.response.data &&  setData({...data, err:err.response.data.msg, success:''})
        }

}



return(
    <div >
        
    <div className="fg_password" style={{marginTop:'200px'}}>
<h1>Forgot Your Password?</h1>
<div className="row">
    <div className="col-3"></div>
    <div className="col-6">


    
    {err && showErrorMessage(err)}
    {success && showSuccessMessage(success)}

    <label htmlFor="email">Enter Your Email</label>
    <input type="email" name="email" id="email"  value={email} 
    onChange={handleChangeInput}
    />
    <button onClick={forgotPassword}>
        
        Submit</button>
    </div>
</div>
<div className="col-3"></div>
    </div>
    </div>
)


}
export default ForgetPassword;
