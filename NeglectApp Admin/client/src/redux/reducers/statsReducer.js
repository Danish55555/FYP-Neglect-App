import ACTIONS from '../actions/index';

const statsReducer=(state={},action)=>{
    switch(action.type){
        case ACTIONS.STATS:
            return {
                ...state,value:action.payLoad
            }
        
        default:
            return state
    }

}
export default statsReducer;