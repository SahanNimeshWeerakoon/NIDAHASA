import React, { Fragment } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
	return (
		<div className="search-div">
			<input type="text" name="search" placeholder="SEARCH....." />
			<button><FaSearch /></button>
		</div>
	)
}

export default SearchBar