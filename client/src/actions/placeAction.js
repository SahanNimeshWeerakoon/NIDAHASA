import axios from 'axios';
import { FETCH_PLACES, PLACES_LOADING } from './types';

export const fetchPlaces = () => dispatch => {
    dispatch(setPlacesLoading());

    axios
        .get('http://localhost:5000/api/places')
        .then(res => {
            dispatch({
                type: FETCH_PLACES,
                payload: res.data
            })
        });
}

export const setPlacesLoading = () => {
    return {
        type: PLACES_LOADING
    }
}