import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearPlace, fetchUserPlaces } from '../../actions/placeAction';
import ManagerPlaceCard from './ManagerPlaceCard';
import Pagination from 'react-js-pagination';

const PlacesList = ({ clearPlace, fetchUserPlaces, auth, places }) => {
	const [activePage, setActivePage] = useState(1);

	useEffect(() => {
		clearPlace();
	}, []);

	useEffect(() => {
		if(auth.user) {
			fetchUserPlaces(auth.user._id);
		}
	}, [auth]);

	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	}

	const placesList = places.length>0 ? (
			<div className="container">
				{ places.map(place => {
					const image = place.hasOwnProperty("images") ? place.images.split(',')[0].replace("\"", "") : "no_image.jpg";
					return (
							<div className="container" key={place._id}>
								<ManagerPlaceCard src={image} title={place.title} description={place.description} />
							</div>
						);
				}) }
			</div>
		) : (
		<p>No have places</p>
		);


	return (
		<Fragment>
			{ placesList }
			<Pagination
		          activePage={activePage}
		          itemsCountPerPage={10}
		          totalItemsCount={places.length>0 ? places.length : 1}
		          pageRangeDisplayed={((places.length-5)>0) ? 5 : places.length}
		          onChange={handlePageChange.bind(this)}
		          itemClassFirst="first-page"
		          itemClassPrev="prev-page"
		          itemClassNext="next-page"
		          itemClassLast="last-page"
		        />
		    { auth.isAuthenticated ? null : <Redirect to="/login_register" /> }
		</Fragment>
	);
}

const mapStateToProps = state => ({
	auth: state.auth,
	places: state.places.places
});

export default connect(mapStateToProps, { clearPlace, fetchUserPlaces })(PlacesList);