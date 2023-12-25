import {combineReducers} from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import counter from './counterReducer';
import apptReducer from './appointmentReducer';
import stats from './statsReducer';
export default combineReducers(
    {
        auth,token,counter,apptReducer,stats
    }
)