import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    type: null
};

export default (state=initialState, action) => {
    switch(action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.success,
                type: action.payload.type
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                type: null
            };
        default:
            return state;
    }
}