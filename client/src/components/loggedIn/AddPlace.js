import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
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

    images = [];

    getImages = (images) => {
        this.images = images;
    }

    addNewPlace = e => {
        e.preventDefault();
        const { title, description, longitude, latitude } = this.state;

        const newPlace = {
            title,
            description,
            location: longitude+' - '+latitude,
            images: this.images
        };
        console.log({"component":newPlace});

        this.props.newPlace(newPlace);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {  

        return (
            <div className="add-place">
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
            </div>
        );
    }
}

export default connect(null, { newPlace })(AddPlace);