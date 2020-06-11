import { combineReducers } from 'redux'
import postReducer from './postReducer'
import placeReducer from './placeReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import chatReducer from './chatReducer'

export default combineReducers({
    posts: postReducer,
    places: placeReducer,
    error: errorReducer,
    auth: authReducer,
    chat: chatReducer
});