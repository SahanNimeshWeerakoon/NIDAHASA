import React, { useEffect, useState } from 'react'
import { fetchPlaces } from '../../actions/placeAction'
import TopPlaces from '../modules/TopPlaces'
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'

const ViewPlaces = ({ places, fetchPlaces }) => {
	const [activePage, setActivePage] = useState(1)
	const [itemsPerPage, setitemsPerPage] = useState(12)
	const [startPage, setStartPage] = useState(0)
	const [endPage, setEndPage] = useState(startPage+itemsPerPage-1)

	useEffect(() =>{
		fetchPlaces()
	}, [])

	useEffect(() => {
		const strPg = (activePage-1)*itemsPerPage
		const endPg = strPg+itemsPerPage

		setStartPage(strPg)
		setEndPage(endPg)
	}, [activePage])

	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	}
	
	return (
		<div className="view-places container">
			<TopPlaces isAllPlaces={true} startPlace={startPage} endPlace={endPage} />
			<Pagination
		          activePage={activePage}
		          itemsCountPerPage={itemsPerPage}
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
	places: state.places.places
})

export default connect(mapStateToProps, { fetchPlaces })(ViewPlaces)