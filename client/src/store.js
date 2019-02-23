import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
//works because the root reducer is called index.js
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    //only at dev mode
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

//const store = createStore(rootReducer, initialState, compose(
//    applyMiddleware(...middleware)));

export default store;