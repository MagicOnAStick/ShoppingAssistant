import { GET_ERRORS } from './types';

//axios is an http client (alternative to js fetch api)
import axios from 'axios';

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

//inside component redirect works as follows: this.props.history.push('/landing');