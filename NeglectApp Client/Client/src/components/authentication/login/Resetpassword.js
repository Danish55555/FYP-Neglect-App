import React, { useState} from 'react';
import axios  from 'axios';
import { useParams } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../../utils/Notification';
import { isLength, isMatch } from "../../../utils/Validation";
const initialState={
    password:'',
    cf_password:'',
    err:'',
    success:''

}
function ResetPassword  () {
  
    const [data,setData]=useState(initialState);
    console.log(useParams().id)
    const token=useParams().id;
    console.log(token)
    const {password,cf_password,err,success}=data;



    const handleChangeInput=e=>{
        const {name,value}=e.target;
        setData({...data,[name]:value,err:'',success:''})
    
    }

    const resetPassword=async ()=>
{

    if(isLength(password)){
        return   setData({...data,err:'Enter new password with length atleast 5',success:''})
    }
    if(!isMatch(password,cf_password)){
        return   setData({...data,err:'Password did not Match',success:''})

    }
    
        try{
            
                const res=await axios.post('/user/resetpassword',{password},{
headers:{Authorization:token}

                })
                return  setData({...data,err:'',success:res.data.msg})

        }
        catch(err){
            err.response.data &&  setData({...data, err:err.response.data.msg, success:''})
        }

}






  return (
      <div className='overflow-hidden'>
      
        <div className="fg_password" style={{marginTop:'200px'}}>
<h1>Reset Your Password?</h1>
<div className="row">
    <div className="col-3"></div>
    <div className="col-6">


    
    {err && showErrorMessage(err)}
    {success && showSuccessMessage(success)}

    <label htmlFor="password">Enter Your New Password</label>
    <input type="password" name="password" id="password"  value={password} 
    onChange={handleChangeInput}
    />
    <br />
    <label htmlFor="cf_password">Confirm New password</label>
    <input type="password" name="cf_password" id="cf_password"  value={cf_password} 
    onChange={handleChangeInput}
    />
    


    <button onClick={resetPassword}>
        
        Reset Password</button>
    </div>
</div>
<div className="col-3"></div>
    </div>
    </div>
)

}

export default ResetPassword;            