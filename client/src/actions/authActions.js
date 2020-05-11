import axios from 'axios';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { returnErrors } from './errorActions';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios.get('http://localhost:5000/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch( returnErrors(err.response.data, err.response.status) );
            dispatch({
               type: AUTH_ERROR
            });
        });
}

// Login user
export const login = ({ username, password }) => (dispatch, getState) => {
    // Headers
    const config = tokenConfig(getState);

    const body = JSON.stringify({ username, password });

    axios.post('http://localhost:5000/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.data.success, err.response.data.type));
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// Register user
export const register = ({ name, contact, username, password, password_conf }) => (dispatch, getState) => {
    // Headers
    const config = tokenConfig(getState);

    const body = JSON.stringify({ name, contact, username, password, password_conf });

    axios.post('http://localhost:5000/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.data.success, err.response.data.type));
            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// Logout user
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    });
}

// setup config/headers and token
export const tokenConfig = (getState)  => {
     // get token from localStorage
     const token = getState().auth.token;

     const config = {
         headers: {
             "Content-type" : "application/json"
         }
     }
 
     // If token add to headers
     if(token) {
         config.headers['x-auth-token'] = token;
     }

    return config;
}