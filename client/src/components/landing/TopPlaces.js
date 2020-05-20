import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlaces } from '../../actions/placeAction';

class TopPlaces extends Component {
    componentWillMount() {
        this.props.fetchPlaces();
    }
    render() {
        const placeItems = this.props.places ? this.props.places.map(place => {
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
                        <a href="#" className="liquid-button">
                            <span>Try place out</span>
                            <div className="liquid"></div>
                        </a>
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
                <h1>Top Places</h1>
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

export default connect(mapStateToProps, { fetchPlaces })(TopPlaces);