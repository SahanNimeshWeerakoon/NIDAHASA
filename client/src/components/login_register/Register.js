import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contact: '',
            username: '',
            password: '',
            password_conf: '',
            msg: null,
            errorType: null
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // get user data from state
        const { name, contact, username, password, password_conf } = this.state;
        // generate new user object
        const newUser = { name, contact, contact, username, password, password_conf};
        // Register user
        this.props.register(newUser);
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if(error !== prevProps.error) {
            if(error.type !== null) {
                this.setState({ msg: error.msg, errorType: error.type });
            } else {
                this.setState({ msg: null, errorType: null });
            }
        }
    }

    render() {
        return (
            <div className="register">
                <h4>Register</h4>
                <small>Please fill the following fields to register...... (No one sees your personal information otherthan myself ;-)</small>
                <form onSubmit={this.handleSubmit}>
                    <div className="fields">
                        <input type="text" name="name" id="name" onChange={this.handleChange} required />
                        <label htmlFor="name">Your Name</label>
                        { this.state.errorType=='name' ? <small>{this.state.msg}</small> : null }
                    </div>
                    <div className="fields">
                        <input type="text" name="contact" id="contact" onChange={this.handleChange} required />
                        <label htmlFor="contact">Whatsapp No. / Email </label>
                        { this.state.errorType=='contact' ? <small>{this.state.msg}</small> : null }
                    </div>
                    <div className="fields">
                        <input type="text" name="username" id="username" onChange={this.handleChange} required />
                        <label htmlFor="username">Username</label>
                        { this.state.errorType=='username' ? <small>{this.state.msg}</small> : null }
                    </div>
                    <div className="fields">
                        <input type="password" name="password" id="password" onChange={this.handleChange} required />
                        <label htmlFor="password">Password</label>
                        { this.state.errorType=='password' ? <small>{this.state.msg}</small> : null }
                    </div>
                    <div className="fields">
                        <input type="password" name="password_conf" id="password_conf" onChange={this.handleChange} required />
                        <label htmlFor="password_conf">Confirm Password</label>
                        { this.state.errorType=='password_conf' ? <small>{this.state.msg}</small> : null }
                    </div>
                    <div className="fields">
                        <button className="btn-register" type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register })(Register)