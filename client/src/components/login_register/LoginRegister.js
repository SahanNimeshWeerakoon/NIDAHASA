import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
    const [switchState, changeSwitchState] = useState(true);
    const handleSwitchClick = () => {
        changeSwitchState(!switchState);
    }
    return (
        <div className="login-register">
            <div className="log-reg-form">
                <div className="log-reg-switch" onClick={handleSwitchClick}>
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
        </div>
    );
}

export default LoginRegister