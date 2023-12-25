import ACTIONS from '../actions/index';
const initialState={
    user:[],
    isLogged:false,
    isDoctor:false

}
const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case ACTIONS.LOGIN:
            return{
                ...state,
                isLogged:true
            }
        case ACTIONS.LOGOUT:
            return{
                ...state,
                isLogged:false
            }    
        case ACTIONS.GET_USER:
            return{
                ...state,
                user:action.payload.user
            }
        default:
            return state
    }

}
export default authReducer;