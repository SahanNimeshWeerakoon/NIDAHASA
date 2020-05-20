import React, { Component } from 'react';
import AddPlace from './AddPlace';
import ManagerCard from './ManagerCard';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Manager extends Component {
    render() {
		const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="cell cell-3">
                            <ManagerCard
                                to="/viewplaceslist"
                                src="http://localhost:5000/images/managerImages/placeList.jpg"
                                alt="View places list"
                                title="View places list"
                                page="Place List"
                                description="See the list of places you have added..."
                                 />
                        </div>
                        <div className="cell cell-3">
                            <ManagerCard
                                to="/addplace"
                                src="http://localhost:5000/images/managerImages/addPlace.jpg"
                                alt="Add a new place"
                                title="Add a new place"
                                page="Add New Place"
                                description="Add a new place to your places collection"
                                 />
                        </div>
                    </div>
                </div>
                { isAuthenticated ? null : <Redirect to="/login_register" /> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(Manager);