import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Carousel from '../modules/Carousel'
import { connect } from 'react-redux'
import { fetchSinglePlace, updatePlace } from '../../actions/placeAction'
import { FaHeart, FaEdit, FaCheck, FaComments } from 'react-icons/fa'

class SinglePlace extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: {val:'', clicked: false},
			description: {val:'', clicked: false},
			longitude: {val:'', clicked: false},
			latitude: {val:''},
			isAdmin: false
		}
	}

	componentDidMount() {
		this.props.fetchSinglePlace(this.props.match.params.id)
	}

	componentDidUpdate(prevProps) {
		const place = this.props.places.place
		const auth = this.props.auth

		// Set place details
		if(prevProps.places.place !== place) {
			const location = place.location.split(" - ")
			this.setState({
				title: {...this.state.title, val: place.title},
				description: {...this.state.description, val: place.description},
				longitude: {...this.state.longitude, val: location[0]},
				latitude: {...this.state.latitude, val: location[1]}
			})
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
		} else if(this.state.isAdmin) {
			this.setState({ isAdmin: false });
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: {
				...this.state[e.target.name],
				val: e.target.value
			}
		})
	}

	handleClick = (e, clicked) => {
		const targetName = e.target.getAttribute('name')
		const id = this.props.match.params.id

		let updatedFld = {[targetName]: this.state[targetName].val}

		let updatedState = {
			[targetName]: { ...this.state[targetName], clicked }
		}

		if(targetName === 'longitude' || targetName === 'latitude') {
			const { longitude, latitude } = this.state
			updatedFld = { 'location': longitude.val+' - '+latitude.val }
			updatedState = { 'longitude': { ...this.state.longitude, clicked } }
		}

		if(!clicked) {
			this.props.updatePlace( id, updatedFld )
		} else {

		}
		this.setState(updatedState)
	}

	render() {
		const place  = this.props.places.place
		const { isAdmin } = this.state
		const { isAuthenticated } = this.props.auth
		var images = ['no_image.jpg', 'no_image.jpg']
	    var content = (
	    	<h1>No Content</h1>
	    )

	    if(place.hasOwnProperty('_id')) {
	    	let imgArr = place.images
	    	imgArr = imgArr.replace(/\"/g, "").split(",")
	    	images = imgArr
	    	const { title, description, longitude, latitude } = this.state

	    	content = (
				<Fragment>
					<Carousel images={images} height="100vh" />
					<span className="image">
						<NavLink to={`/updateImages/${this.props.match.params.id}`}>
							{ isAdmin ? <FaEdit className="edit" /> : null }
						</NavLink>
					</span>
					<div className="reacts">
						<span className="like">
							<FaHeart className="heart" />
							<small>
								{ place.likes_count }
							</small>
						</span>
					</div>
					<small className="posted-on">Place posted on { place.created_date }</small>

					<div className="container">
						<span className="title fields">
							<input type="text" name="title" readOnly={title.clicked ? false : true} className={title.clicked ? "" : "readonly"} value={ title.val } onChange={ this.handleChange } onBlur={(e) => this.handleClick(e, false)} />
							{ isAdmin ? title.clicked ? <FaCheck name="title" className="edit check" onClick={(e) => this.handleClick(e, false)} /> : <FaEdit className="edit" name="title" onClick={(e) => this.handleClick(e, true)} /> : null }
						</span>
						<span className="description fields">
							<textarea defaultValue={ description.val } readOnly={description.clicked ? false : true} className={description.clicked ? "" : "readonly"} name="description" onChange={ this.handleChange } onBlur={(e) => this.handleClick(e, false)}></textarea>
							{ isAdmin ? description.clicked ? <FaCheck name="description" className="edit check" onClick={(e) => this.handleClick(e, false)}/> : <FaEdit className="edit" name="description" onClick={(e) => this.handleClick(e, true)} /> : null }
						</span>
						<span className="location">
							<h4>Location: </h4>
							<div className="fields">
								<small htmlFor="longitude">Longitude</small>
								<input type="text" name="longitude" readOnly={longitude.clicked ? false : true} className={longitude.clicked ? "" : "readonly"} value={ longitude.val } onChange={ this.handleChange }  onBlur={(e) => this.handleClick(e, false)}/>
							</div>
							<div className="fields">
								<small htmlFor="latitude">Latitude</small>
								<input type="text" name="latitude" readOnly={longitude.clicked ? false : true} className={longitude.clicked ? "" : "readonly"} value={ latitude.val } onChange={ this.handleChange }  onBlur={(e) => this.handleClick(e, false)}/>
							</div>
							{ isAdmin ? longitude.clicked ? <FaCheck name="longitude" className="edit check" onClick={(e) => this.handleClick(e, false)} /> : <FaEdit className="edit" name="longitude" onClick={(e) => this.handleClick(e, true)} /> : null }
						</span>
					</div>
					{ isAuthenticated ? !isAdmin ? <NavLink to={`/chat/${place.user_id}`} className="chat-owner" title="Chat with owner"><FaComments /></NavLink> : null : null }
				</Fragment>
			)
	    }

		return (
			<div className="single-place">
				{ content }
			</div>
		)
	}
}

const mapStateToProps = state => ({
	places: state.places,
	auth: state.auth
})

export default connect(mapStateToProps, { fetchSinglePlace, updatePlace })(SinglePlace)