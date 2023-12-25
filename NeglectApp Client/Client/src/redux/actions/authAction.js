import ACTIONS from "./index";
import axios from 'axios';
export const dispatchLogin=()=>{
    return{
        type:ACTIONS.LOGIN
    }
}

export const dispatchLogout=()=>{
    return{
        type:ACTIONS.LOGOUT
    }
}


export const fetchUser=async(token)=>{
    const res=await axios.get('/user/infor',{
        headers:{Authorization:token}
    })
return res
}

export const dispatchGetUser=(res)=>{
    
return {
    type:ACTIONS.GET_USER,
    payload:{
        user:res.data

    }
}
}
// eslint-disable-next-line
const increment=()=>{
    return{
        type:ACTIONS.INCREMENT
    }
}
// eslint-disable-next-line
const decrement=()=>{
    return{
        type:ACTIONS.DECREMENT
    }
}
// eslint-disable-next-line
const startappt=()=>{
    return{
        type:ACTIONS.STARTAPPT
    }
}
// eslint-disable-next-line
const endappt=()=>{
    return{
        type:ACTIONS.ENDAPPT
    }
}
const statsPost=()=>{
    return{
        type:ACTIONS.STATS   
    }
}