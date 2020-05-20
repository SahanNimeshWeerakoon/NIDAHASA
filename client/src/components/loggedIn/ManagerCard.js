import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

const ManagerCard = ({ to, src, alt, title, page, description }) => {
	return (
			<NavLink to={to} className="manager-card" >
				<div className="dark-overlay">
					<img src={src} alt={alt} title={title} />
				</div>
				<div className="content">
					<span>{page}</span>
					<small>{ description }</small>
				</div>
			</NavLink>
	);
}

export default ManagerCard;