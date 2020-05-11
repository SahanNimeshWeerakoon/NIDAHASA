import React, { Component } from 'react';
import Posts from './Posts';
import PostForm from './PostForm';
import { Provider } from 'react-redux';
import store from '../store';
import TopPlaces from './landing/TopPlaces';
import '../styles/App.scss';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Navbar from './Navbar';
import LoginRegister from './login_register/LoginRegister';
const Route = require('react-router-dom').Route;
import { loadUser } from '../actions/authActions';
import Manager from './loggedIn/Manager';
import AddPlace from './loggedIn/AddPlace';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Navbar />
                        <Route path="/" component={ TopPlaces } exact={true} />
                        <Route path="/login_register" component={ LoginRegister } exact={true} />
                        <Route path="/manager" component={ Manager } exact={true} />
                        <AddPlace />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App
