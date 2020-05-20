import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const ManagerPlaceCard = ({ src, title, description }) => {
	return (
		<div className="manager-place-card">
			<div className="dark-overlay">
				<img src={`http://localhost:5000/images/places/${src}`} title={title} alt={title} />
				<div className="content">
					<p>{title}</p>
					<small>{description}</small>
				</div>
				<NavLink to="/" className="edit-place" ><FaEdit className="edit" /></NavLink>
			</div>
		</div>
	);
}

export default ManagerPlaceCard