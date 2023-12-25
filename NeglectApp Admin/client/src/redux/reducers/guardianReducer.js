import ACTIONS from '../actions'

const guardians =[]

const guardiansReducer = (state = guardians, action) => {
    switch(action.type){
        case ACTIONS.GET_GUARDIANS:
            return action.payload
        default:
            return state
    }
}

export default guardiansReducer