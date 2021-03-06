import axios from 'axios';
import  {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';

//dispatch for async calls
export const getItems = (user_id) => dispatch => {
    dispatch(setItemsLoading());
    //see package.json proxy for avoiding the need of using the full path
    axios
    .get(`/api/items/${user_id}`) //connect to backend
    .then(res => dispatch({
        // IMPORTANT return for calling reducer logic at all reducers with a case for the type
        type: GET_ITEMS,
        payload: res.data
    }))
}

export const addItem = item => dispatch =>{
    axios
    .post('/api/items', item)
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data //new item - see backend
    }))
}

export const deleteItem = id => dispatch => {
    //remove from server
    axios.delete(`/api/items/${id}`)
    //remove from ui
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
}

export const setItemsLoading = () =>{
    return {
        type: ITEMS_LOADING
    }
}