import ACTIONS from './index'
import axios from 'axios'

export const fetchDoctors = async(token)=>{
    const res = await axios.get('/admin/doctorinfor', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetDoctors = (res) => {
    return{
        type: ACTIONS.GET_DOCTORS,
        payload: res.data
    }
}