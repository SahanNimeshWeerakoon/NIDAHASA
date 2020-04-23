import { combineReducers } from 'redux';
import postReducer from './postReducer';
import placeReducer from './placeReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    posts: postReducer,
    places: placeReducer,
    error: errorReducer,
    auth: authReducer
});