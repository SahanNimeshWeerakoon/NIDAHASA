import React, { Fragment, Component } from 'react'
import io from 'socket.io-client'
import moment from 'moment'
import { setReceiver, loadChat } from '../../actions/chatActions'
import { connect } from 'react-redux'
import { FaTelegramPlane } from 'react-icons/fa'

class ChatBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chatMessage: "",
			chatHistory: []
		}
	}

	componentDidMount() {
		
		const { setReceiver, receiverId, loadChat, auth } = this.props
		
		if(auth.user) {
			let server = "http://localhost:5000"


			setReceiver(receiverId)

			this.socket = io(server)

			this.socket.on("Output Chat Message", messageFromBackEnd => {
				console.log(messageFromBackEnd)
			})

			loadChat(auth.user._id, receiverId)
		}
	}

	handleChange = e => {
		this.setState({
			chatMessage: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault()

		const { name, _id } = this.props.auth.user

		const userId = this.props.auth.user._id
		const receiverId = this.props.chat.receiver._id
		const chatMessage = this.state.chatMessage
		const nowTime = moment()
		const type= 'Image'

		this.socket.emit('Input Chat Message', { id: _id, receiverId, name, chatMessage, nowTime, type })

		this.setState({ chatMessage: "" })
	}

	render() {

		const { chat, auth } = this.props

		var returnData = (
			<div className="select-chat">Select a chat to proceed</div>
		)

		if(chat.receiver && chat.receiver.hasOwnProperty('name')) {
			const prevChatList = chat.chatList.length!==0 ? chat.chatList.map(chatItem => (
				<div className={`message-group ${auth.user._id===chatItem.sender?'owner':null}`} key={chatItem._id}>
					<p className={`username ${auth.user._id===chatItem.sender?'owner':null}`}>{ auth.user._id===chatItem.sender ? 'You' : chat.receiver.name }</p>
					<p className={`message ${auth.user._id===chatItem.sender?'owner':null}`}>{ chatItem.message }</p>
				</div>
			)) : null

			returnData = (
				<Fragment>
					<div className="chat-header">
						<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
						<p>{ this.props.chat.receiver ? this.props.chat.receiver.name : null }</p>
					</div>
					<div className="chat-body">
						{ prevChatList }
					</div>
					<div className="chat-footer">
						<form onSubmit={this.handleSubmit}>
							<input type="text" name="chat_message" placeholder="Type here...." value={this.state.chatMessage} onChange={this.handleChange} />
							<button type="submit"><FaTelegramPlane /></button>
						</form>
					</div>
				</Fragment>
			)
		}

		return returnData
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	chat: state.chat
})

export default connect(mapStateToProps, { setReceiver, loadChat })(ChatBox)