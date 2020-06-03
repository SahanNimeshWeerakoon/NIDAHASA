import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ImageUpload from '../modules/ImageUpload'
import { fetchSinglePlace, updatePlace } from '../../actions/placeAction'
import { connect } from 'react-redux'

class UpdatePlaceImages extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            images: [],
            newImages: [],
            isAdmin: true
        };
    }

	updateNewImages = e => {
        e.preventDefault();
        const { images, newImages } = this.state;
        const { id } = this.props.match.params;

        const formParams = {
            userId: this.props.auth.user._id,
            imagesCount: newImages.length,
            oldImages: images
        };
        const newPlace = new FormData();
        newImages.forEach((image, index) => {
            newPlace.append(`image${index}`, image); 
        });
        newPlace.append('fields', JSON.stringify(formParams));

        this.props.updatePlace(id, newPlace);
    }

    getImages = ( newImages ) => {
        this.setState({ newImages });
    }

    removeImage = (image) => {
        const { images } = this.state
        const newImgs = images.filter( singImage => singImage !== image )
        this.setState({
            images: newImgs
        });
    }

    componentDidMount() {
        this.props.fetchSinglePlace(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        const auth = this.props.auth
        const { place } = this.props

        if(prevProps.place !== place) {
            this.setState({
                images: place.images.replace(/\"/g, "").split(",")
            });
        }

        // wen auth.user loads, place also loads. So just checking auth.user is enough
        if(auth.user) {
            if(auth.user._id === place.user_id) {
                if(!this.state.isAdmin) {
                    this.setState({ isAdmin: true });
                }
            } else if(this.state.isAdmin) {
                this.setState({ isAdmin: false });
            }
        } else if(this.state.isAdmin && prevProps.auth !== auth) {
            this.setState({ isAdmin: false });
        }
    }

	render() {
        const prevImages = this.state.images.map( (image, index) => {
                            return (
                                <div className="img-bkgrnd" key={ index }>
                                    <img src={`http://localhost:5000/images/places/${image}`} onClick={() => this.removeImage(image)} />
                                </div>
                            )
                        });
		return (
            <div className="update-place-images">
                <div className="container">
                    <div className="prev-images">
                        { prevImages }
                    </div>
                    <div className="form image-form">
                        <form onSubmit={ this.updateNewImages }>
                            <ImageUpload getImages={(images) => this.getImages(images) } />
                            <div className="fields">
                                <button className="add-place-btn" type="submit"> Update Images </button>
                            </div>
                        </form>
                    </div>
                </div>
                { this.state.isAdmin ? null : <Redirect to="/" /> }
            </div>
		)
	}
}

const mapStateToProps = state => ({
    place: state.places.place,
    auth: state.auth
});

export default connect(mapStateToProps, { updatePlace, fetchSinglePlace })(UpdatePlaceImages)