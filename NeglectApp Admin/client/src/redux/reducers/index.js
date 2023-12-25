import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducers'
import guardians from './guardianReducer'
import doctors from './doctorReducer'
import stats from './statsReducer';

export default combineReducers({
    auth, 
    token,
    guardians,
    doctors,
    stats
})