import React, { Component } from 'react';
import ImageUpload from '../modules/ImageUpload';
import { Redirect } from 'react-router-dom';
import { newPlace } from '../../actions/placeAction';
import { connect } from 'react-redux'

class AddPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            longitude: '',
            latitude: '',
            images: [],
        };
    }

    getImages = (images) => {
        this.setState({images});
    }

    addNewPlace = e => {
        e.preventDefault();
        const { title, description, longitude, latitude, images } = this.state;

        const formParams = {
            title,
            description,
            location: longitude+' - '+latitude,
            userId: this.props.auth.user._id,
            imagesCount: images.length
        };
        const newPlace = new FormData();
        images.forEach((image, index) => {
            newPlace.append(`image${index}`, image); 
        });
        newPlace.append('fields', JSON.stringify(formParams));

        this.props.newPlace(newPlace);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {  
        const { isAuthenticated } = this.props.auth;

        const { place } = this.props.places;
        const content = (
            <div className="container">
                <div className="form">
                    <h3>Add a New Plae</h3>
                    <form onSubmit={this.addNewPlace}>
                        <div className="fields">
                            <input type="text" name="title" id="title" required onChange={this.handleChange} />
                            <label htmlFor="title">Title</label>
                            {/* { this.state.errorType=='title' ? <small>{this.state.msg}</small> : null } */}
                        </div>
                        <div className="fields">
                            <textarea name="description" id="description" required onChange={this.handleChange} ></textarea>
                            <label htmlFor="description">Description</label>
                            {/* { this.state.errorType=='title' ? <small>{this.state.msg}</small> : null } */}
                        </div>
                        <div className="fields">
                            <input type="text" name="longitude" id="longitude" required onChange={this.handleChange} />
                            <label htmlFor="longitude">Longitude</label>
                            {/* { this.state.errorType=='longitude' ? <small>{this.state.msg}</small> : null } */}
                        </div>
                        <div className="fields">
                            <input type="text" name="latitude" id="latitude" required onChange={this.handleChange} />
                            <label htmlFor="latitude">Latitude</label>
                            {/* { this.state.errorType=='latitude' ? <small>{this.state.msg}</small> : null } */}
                        </div>
                        <ImageUpload getImages={(images) => this.getImages(images) } />
                        <div className="fields">
                            <button className="add-place-btn" type="submit">Share The Place </button>
                        </div>
                    </form>
                </div>
                <div className="help">
                    <div className="dark-overlay">
                        <div>
                            <h3>Any doubts with adding a place?</h3>
                            <p>No worries. Read about this by clicking the bellow button. </p>
                        </div>
                        <button className="help-btn">Help</button>
                    </div>
                </div>
            </div>
        );

        if(this.props.places.place.title) {
            return <Redirect to="/viewplaceslist" />;
        } else {
            return (
                <div className="add-place">
                    { !isAuthenticated ? <Redirect to="/login_register" /> : content }
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    places: state.places
});

export default connect(mapStateToProps, { newPlace })(AddPlace);