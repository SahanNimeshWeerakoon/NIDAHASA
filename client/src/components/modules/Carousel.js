import React, { useState, useEffect, useRef } from 'react';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

const Carousel = ({images, height}) => {

	const [seconds, setSeconds] = useState(0);
    const [visibleImg, setVisibleImg] = useState(0);

    const slides = images.map((image, index)=>{
		return (
				<img src={`http://localhost:5000/images/places/${image}`} key={index} className={ visibleImg==index ? "visible" : "" } />
			);
	});

    const handleNavClick = (direction) => {
		
		setVisibleImg(visibleImg => {
				//				// +/-			 // last image ? set to 0 : add one to visibleImg 		// firstImg    ? // set to lastImg : // reduce one
				const valToSet = (direction>0) ? ((images.length-1)===visibleImg ? 0 : visibleImg+1) : (visibleImg===0 ? images.length-1 : visibleImg-1);
				return valToSet;
		} );
	}

    useEffect(() => {
        const interval = setInterval(() => {
            handleNavClick(1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
		<div className="carousel" style={{ height: height }}>
			<FaLessThan className="less-than" onClick={() => handleNavClick(-1)} />
			<FaGreaterThan className="greater-than" onClick={() => handleNavClick(1)} />
			{slides}
		</div>
    );
}

export default Carousel