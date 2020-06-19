import React, { useEffect, useState } from 'react'
import { fetchPlaces } from '../../actions/placeAction'
import TopPlaces from '../modules/TopPlaces'
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'

const ViewPlaces = ({ places, fetchPlaces }) => {
	const [activePage, setActivePage] = useState(1);

	useEffect(() =>{
		fetchPlaces()
		console.log(places)
	}, [])

	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	}
	
	return (
		<div className="view-places container">
			<TopPlaces isAllPlaces={true} />
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
		</div>
	)
}

const mapStateToProps = state => ({
	places: state.places
})

export default connect(mapStateToProps, { fetchPlaces })(ViewPlaces)