import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const ManagerPlaceCard = ({ src, title, description, id }) => {
	return (
		<div className="manager-place-card">
			<div className="dark-overlay">
				<div className="img">
					<img src={`http://localhost:5000/images/places/${src}`} title={title} alt={title} />
				</div>
				<div className="content">
					<p>{title}</p>
					<small>{description}</small>
				</div>
				<NavLink to={`/singlePlace/${id}`} className="edit-place" ><FaEdit className="edit" /></NavLink>
			</div>
		</div>
	);
}

export default ManagerPlaceCard