import { FETCH_PLACES, PLACES_LOADING, NEW_PLACE, CLEAR_PLACE } from '../actions/types';

const initialState = {
    places: [],
    place: {},
    loading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_PLACES:
            console.log(action.payload)
            return {
                ...state,
                places: action.payload,
                loading: false
            };
        case PLACES_LOADING:
            return {
                ...state,
                loading: true
            }
        case NEW_PLACE:
            return {
                ...state,
                place: action.payload
            };
        case CLEAR_PLACE:
            return {
                ...state,
                place: {}
            };
        default:
            return state;
    }
}