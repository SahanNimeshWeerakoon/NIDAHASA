import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            msg: null,
            errorType: null
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            if(error.type !== null) {
                this.setState({ msg: error.msg, errorType: error.type });
            } else {
                this.setState({ msg: null, errorType: null });
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const credentials = { username, password}   // getting credentials
        this.props.login(credentials);              // Attempt to login
    }

    render() {
        return (
            <div className="login">
                <h4>Login</h4>
                <small>Please enter username and password.....</small>
                <form onSubmit={this.handleSubmit}>
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
                        <button className="btn-login">LOGIN</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    isAuthenticaed: state.auth.isAuthenticaed,
    error: state.error
})

export default connect(mapStateToProps, { login })(Login);