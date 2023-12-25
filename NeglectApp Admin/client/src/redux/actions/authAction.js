import ACTIONS from './index'
import axios from 'axios'
export const dispatchLogin = () =>{
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchAdmin = async(token)=>{
    const res = await axios.get('/admin/infor', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetAdmin = (res) => {
    return{
        type: ACTIONS.GET_ADMIN,
        payload: {
            admin: res.data
        }
    }
}

const statsPost=()=>{
    return{
        type:ACTIONS.STATS   
    }
}