import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { loadReceivers } from '../../actions/chatActions'
import { connect } from 'react-redux'

const ChatList = ({ loadReceivers, receiverId, auth, chat }) => {
	const [list, setList] = useState([])

	useEffect(() => {
		loadReceivers(auth.user._id)
	}, [])

	useEffect(() => {
		setList(chat.receiversList)
	}, [chat])

	const usersList = list.map(receiver => {
		return (
			<NavLink to={`/chat/${receiver._id}`} key={receiver._id}>
				<div className={`user ${receiver._id===receiverId ? 'active' : null}`}>
					<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
					<p>{ receiver.name }</p>
				</div>
			</NavLink>
		)
	})

	return (
		<Fragment>
			<div className="chat-list-header">
				<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
				<p>{ auth.user.name }</p>
			</div>
			<div className="chat-list-body">
				{ usersList }
			</div>
		</Fragment>
	)
}

const mapStateToProps = state => ({
	auth: state.auth,
	chat: state.chat
})

export default connect(mapStateToProps, { loadReceivers })(ChatList)