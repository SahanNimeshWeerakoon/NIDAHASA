import axios from 'axios';
import { FETCH_PLACES, PLACES_LOADING, NEW_PLACE } from './types';
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

export const newPlace = (place) => (dispatch, getState) => {

    const config = tokenConfig(getState);
    config.headers["Content-type"] = "multipart/form-data";
    const body = { name: "test", contact: "test", usernam: "test", password: "sex", password_conf: "text" };
    axios
        // .post('http://localhost:5000/api/places/new', JSON.stringify(place), config)
        .post('http://localhost:5000/api/users', body, config)
        .then(res => {
            dispatch({
                type: NEW_PLACE,
                payload: res.data
            })
        });
}

export const setPlacesLoading = () => {
    return {
        type: PLACES_LOADING
    }
}