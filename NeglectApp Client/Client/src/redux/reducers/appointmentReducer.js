import ACTIONS from '../actions/index';

const apptReducer=(state=0,action)=>{
    // const d = new Date();
    switch(action.type){
        case ACTIONS.STARTAPPT:
            return {
                ...state,value:action.payLoad
            }
        case ACTIONS.ENDAPPT:
            return 0
        
        default:
            return state
    }

}
export default apptReducer;