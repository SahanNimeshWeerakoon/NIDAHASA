import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navActive: false
        }
    }
    handleClick = () => {
        this.setState({ navActive: !this.state.navActive });
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavLink to="#">Logout</NavLink>
            </Fragment>
        );

        const guestLinks  = (
            <Fragment>
                <NavLink to="/login_register" activeClassName="nav-link-active" onClick={this.handleClick} className="nav-link" exact>Login / Register</NavLink>
            </Fragment>
        );

        return (
            // <div className={navbarCalss}>
            <div className="navbar">
                <div className="logo">
                    <img src="http://localhost:5000/images/logo/logo.jpeg" alt="Nidahasa logo" />
                    <FaHamburger className="hamburger" onClick={this.handleClick} />
                </div>
                <div className="nav-links">
                    <NavLink to="/" activeClassName="nav-link-active" className="nav-link" onClick={this.handleClick} exact>Home</NavLink>
                    { isAuthenticated ? authLinks : guestLinks }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar)