import React, { Component } from 'react'
import ChatBox from '../modules/ChatBox'
import ChatList from '../modules/ChatList'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ChatArea extends Component {
	render() {
		const { auth } = this.props
		const id = this.props.match.params.id
		console.log(auth);
		return (
			<div className="chat-area">
				<div className="chat-list">
					<ChatList receiverId={id} />
				</div>
				<div className='chat-box'>
					<ChatBox receiverId={id} />
				</div>
			{/*
	            { auth.isAuthenticated ? null : <Redirect to="/login_register" /> }
			*/}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ChatArea)