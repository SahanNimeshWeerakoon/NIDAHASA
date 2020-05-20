import axios from 'axios';
import { FETCH_PLACES, PLACES_LOADING, NEW_PLACE, CLEAR_PLACE } from './types';
import { tokenConfig } from './authActions';

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

export const fetchUserPlaces = userId => dispatch => {
    axios
        .get(`http://localhost:5000/api/places/${userId}`)
        .then(res => {
            dispatch({
                type: FETCH_PLACES,
                payload: res.data
            });
        });
}

export const fetchSinglePlace = placeId => dispatch => {
    axios
        .get(`http://localhost:5000/api/place/${placeId}`)
        .then(res => {
            dispatch({
                type: NEW_PLACE,
                payload: res.data
            });
        });
}

export const newPlace = (place) => (dispatch, getState) => {

    const config = tokenConfig(getState);
    config.headers["Content-type"] = "multipart/form-data";
    try {
        axios
            .post('http://localhost:5000/api/places/new', place, config)
            .then(res => {
                dispatch({
                    type: NEW_PLACE,
                    payload: res.data
                })
            });
    } catch(e) {
        console.log(e);
    }
}

export const clearPlace = () => {
    return {
        type: CLEAR_PLACE
    };
}

export const setPlacesLoading = () => {
    return {
        type: PLACES_LOADING
    }
}