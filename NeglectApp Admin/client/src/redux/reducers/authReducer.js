import ACTIONS from '../actions/'

const initialState = {
    admin: [],
    isLogged: false,
}

const authReducer = (state=initialState, action)=>{
    switch(action.type){
        case ACTIONS.LOGIN : 
        return {
            ...state,
            isLogged: true,
        }
        case ACTIONS.GET_ADMIN : 
        return {
            ...state,
            admin: action.payload.admin
        }
        default: 
        return state
    }
}

export default authReducer