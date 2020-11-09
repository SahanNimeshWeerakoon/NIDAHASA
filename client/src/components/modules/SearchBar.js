import React, { Fragment, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { fetchSearchResults } from '../../actions/placeAction'
import { connect } from 'react-redux'

const SearchBar = ({fetchSearchResults}) => {
	const [param, setParam] = useState('')

	const handleChange = e => {
		setParam(e.target.value)
		if(param) {
			console.log('has param')
		} else {
			console.log('no param')
		}

		fetchSearchResults(param)
	}

	return (
		<div className="search-div">
			<input type="text" name="search" placeholder="SEARCH....." value={param} onChange={handleChange} />
			<button><FaSearch /></button>
		</div>
	)
}

export default connect(null, { fetchSearchResults })(SearchBar)