import ACTIONS from './index'
import axios from 'axios'

export const fetchGuardians = async(token)=>{
    const res = await axios.get('/admin/guardianinfor', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetGuardians = (res) => {
    return{
        type: ACTIONS.GET_GUARDIANS,
        payload: res.data
    }
}