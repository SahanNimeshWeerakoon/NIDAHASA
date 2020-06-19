import React, { useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import TopPlaces from '../modules/TopPlaces'

const Landing = () => {

	return (
		<div className="landing">
			<div className="banner">
				<div className="dark-overlay">
					<div className="banner-description">
					</div>
					<div className="banner-buttons">
						<button>
							<NavLink to="/addplace" className="add-place-home">ADD PLACE</NavLink>
						</button>
						<button>
							<NavLink to="/allplaces" className="view-places">VIEW PLACES</NavLink>
						</button>
					</div>
				</div>
			</div>
			<TopPlaces isAllPlaces={false} />
		</div>
	)
}

export default Landing