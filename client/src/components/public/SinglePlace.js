import React, { useState, useEffect } from 'react';
import Carousel from '../modules/Carousel';

const SinglePlace = () => {

    const images = ['1-3744204402.jpg', '2-49009440.jpg', '3-9291991659.jpg'];
	
	return (
		<div className="single-place">
			<Carousel images={images} height="100vh" />
		</div>
	);
}

export default SinglePlace;