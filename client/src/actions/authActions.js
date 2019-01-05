import { GET_ERRORS, SET_CURRENT_USER } from './types';

//axios is an http client (alternative to js fetch api)
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register',userData)
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        //save to localstorage
        const { token } = res.data;

        //set to localstorage
        localStorage.setItem('jwtToken', token);

        //set token to authheader
        setAuthToken(token);

        //decode tokenstring to get user data
        const decoded = jwt_decode(token);

        //set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const setCurrentUser = decoded =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');

    // Remove auth header for future requests
    setAuthToken(false);

    //set the current user to empty object {} which also sets isAuthenticated to false
    dispatch(setCurrentUser({}));
};