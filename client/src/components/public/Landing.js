import React, { useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import TopPlaces from '../modules/TopPlaces'
import { FaHandPeace, FaDollarSign, FaHeartbeat } from 'react-icons/fa'

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
			<div className="benefits">
				<h3 className="benefits-title">Benefits of NIDAHASA</h3>
				<div className="row">
					<div className="cell cell-4">
						<div className="row">
							<FaHandPeace className="ben-ico" />
							<h5>Freedom</h5>
						</div>
						<small>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has 
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
							a galley of type and scrambled it to make a type specimen book. It has survived not only 
							five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</small>
					</div>
					<div className="cell cell-4">
						<div className="row">
							<FaDollarSign className="ben-ico" />
							<h5>Free of charge</h5>
						</div>
						<small>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has 
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
							a galley of type and scrambled it to make a type specimen book. It has survived not only 
							five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</small>
					</div>
					<div className="cell cell-4">
						<div className="row">
							<FaHeartbeat className="ben-ico" />
							<h5>I'm here for you</h5>
						</div>
						<small>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has 
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
							a galley of type and scrambled it to make a type specimen book. It has survived not only 
							five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</small>
					</div>
				</div>
			</div>
			<TopPlaces isAllPlaces={false} />
		</div>
	)
}

export default Landing