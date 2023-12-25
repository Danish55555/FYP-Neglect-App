import ACTIONS from '../actions/index';

const counterReducer=(state=0,action)=>{
    switch(action.type){
        case ACTIONS.INCREMENT:
            return state+1
        case ACTIONS.DECREMENT:
            return state-1
        
        default:
            return state
    }

}
export default counterReducer;