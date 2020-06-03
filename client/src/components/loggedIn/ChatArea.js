import React from 'react'
import ChatBox from '../modules/ChatBox'
import ChatList from '../modules/ChatList'

const ChatArea = ({ isAdmin }) => {
	return (
		<div className="chat-area">
			<div className="chat-list">
				<ChatList />
			</div>
			<div className={`chat-box ${isAdmin ? 'admin' : ''}`}>
				<ChatBox />
			</div>
		</div>
	)
}

export default ChatArea