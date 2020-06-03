import React, { Component } from 'react'
import Posts from './Posts'
import PostForm from './PostForm'
import store from '../store'
import TopPlaces from './landing/TopPlaces'
import Navbar from './Navbar'
import LoginRegister from './login_register/LoginRegister'
import Manager from './loggedIn/Manager'
import AddPlace from './loggedIn/AddPlace'
import PlacesList from './loggedIn/PlacesList'
import ManagerCard from './loggedIn/ManagerCard'
import SinglePlace from './public/SinglePlace'
import UpdatePlaceImages from './loggedIn/UpdatePlaceImages'
import { loadUser } from '../actions/authActions'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import Test from './Test'
import ChatArea from './loggedIn/ChatArea'

const Route = require('react-router-dom').Route
import '../styles/App.scss'

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <ChatArea isAdmin={true} />
                {/*<Router>
                    <div>
                        <Navbar />
                        <Route path="/" component={ TopPlaces } exact={true} />
                        <Route path="/login_register" component={ LoginRegister } />
                        <Route path="/manager" component={ Manager } />
                        <Route path="/addplace" component={ AddPlace } />
                        <Route path="/viewplaceslist" component={ PlacesList } />
                        <Route path="/singlePlace/:id" component={ SinglePlace } />
                        <Route path="/updateImages/:id" component={ UpdatePlaceImages } />
                    </div>
                </Router>*/}
                {/*<Test />*/}
            </Provider>
        )
    }
}

export default App
