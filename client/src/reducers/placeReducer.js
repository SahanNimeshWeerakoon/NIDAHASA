import { FETCH_PLACES, PLACES_LOADING, NEW_PLACE } from '../actions/types';

const initialState = {
    places: [],
    place: {},
    loading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_PLACES:
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
        console.log({"placeReducer": action.payload});
            return {
                ...state,
                place: action.payload
            };
        default:
            return state;
    }
}