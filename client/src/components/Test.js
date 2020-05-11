import React, { Component } from 'react';

class Test extends Component {
    sexing = () => {
        this.props.sex();
    }
    render() {
        return (
            <div>
                <p onClick={this.sexing}>fuck</p>
            </div>
        );
    }
}

export default Test