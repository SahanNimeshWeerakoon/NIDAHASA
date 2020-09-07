import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRandomPlaces, fetchPlaces } from '../../actions/placeAction';
import { NavLink } from 'react-router-dom';

class TopPlaces extends Component {
    componentWillMount() {
        const { fetchRandomPlaces, isAllPlaces, fetchPlaces } = this.props
        if(isAllPlaces) {
            fetchPlaces()
        } else {
            fetchRandomPlaces();
        }
    }
    render() {
        const { places, isAllPlaces, startPlace, endPlace } = this.props
        const minPlaces = isAllPlaces ? places.slice(startPlace, endPlace) : places
        const placeItems = minPlaces ? minPlaces.map(place => {
            let first_img = place.hasOwnProperty("images") ? place.images.split(',')[0].replace("\"", "") : "no_image.jpg";
            return (
                <div className="card cell cell-3" key={place._id}>
                    <div className="image">
                        <img src={`http://localhost:5000/images/places/${first_img}`} alt={place.title} />
                    </div>
                    <div className="title">
                        <h6 className="title-text">{place.title}</h6>
                    </div>
                    <div className="body">
                        <p className="body-text">{place.description}</p>
                    </div>
                    <div className="button">
                        <NavLink to={`/singlePlace/${place._id}`} className="liquid-button">
                            <span>Try place out</span>
                            <div className="liquid"></div>
                        </NavLink>
                    </div>
                </div>
            );
        }) : (
            <div className="no-place">
                No Places Yet....
            </div>
        );
        return (
            <div className="top-places">
                <h2>Checkout {this.props.isAllPlaces ? 'the' : 'some awesome'} places added by our fellow travellers</h2>
                <div className="row">
                    { placeItems }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    places: state.places.places
});

export default connect(mapStateToProps, { fetchRandomPlaces, fetchPlaces })(TopPlaces);