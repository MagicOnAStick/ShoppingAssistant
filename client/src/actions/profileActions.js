import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                //return empty profile
                type: GET_PROFILE,
                payload: {}
            }));
}

// Profile Loading
//just informs the reducer that the profile is loading - no payload / data required
export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
}