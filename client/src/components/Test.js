import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { newPlace } from '../actions/placeAction';

const Test = () =>{
    const [seconds, setSeconds] = useState(0);
    const [visibleImg, setVisibleImg] = useState(0);

    const testFunction = () => {
        setSeconds(seconds => seconds + 1);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            testFunction();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {seconds} seconds have elapsed since mounting.
            </header>
        </div>
    );
}

export default connect(null, { newPlace })(Test)