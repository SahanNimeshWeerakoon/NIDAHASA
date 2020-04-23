import { GET_ERRORS, CLEAR_ERRORS } from './types';

// return errors
export const returnErrors = (msg, status, type=null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, type }
    }
}

// clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}