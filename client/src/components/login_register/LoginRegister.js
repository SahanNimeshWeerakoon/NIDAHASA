import React, { Component } from 'react'
import Login from './Login';
import { Redirect } from 'react-router-dom';
import Register from './Register';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginRegister extends Component{
    // const [switchState, changeSwitchState] = useState(true);
    handleSwitchClick = () => {
        // changeSwitchState(!switchState);
        this.setState({ switchState: !this.state.switchState });
    }

    constructor(props) {
        super(props);

        this.state = {
            switchState: true,
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    render() {
        const { switchState } = this.state;
        const loginRegisterCont = (
                <div className="log-reg-form">
                    <div className="log-reg-switch" onClick={this.handleSwitchClick}>
                        <div className={switchState ? "log-reg-bg-color" : "log-reg-bg-color log-reg-bg-right"}></div>
                        <div className="log-reg-text">
                            <p className={switchState ? "white" : ""}>LOGIN</p>
                            <p className={!switchState ? "white" : ""}>REGISTER</p>
                        </div>
                    </div>
                    <div className={switchState ? "login" : "login reg"}>
                        <Login />
                    </div>
                    <div className={switchState ? "register" : "register reg"}>
                        <Register />
                    </div>
                </div>
            );
        return (
            <div className="login-register">
                {this.props.isAuthenticated ? <Redirect to="/Manager" /> : loginRegisterCont}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(LoginRegister);