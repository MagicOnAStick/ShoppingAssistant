import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';


export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});