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
		let server = "http://localhost:5000"

		const { setReceiver, receiverId, loadChat, auth } = this.props

		setReceiver(receiverId)

		this.socket = io(server)

		this.socket.on("Output Chat Message", messageFromBackEnd => {
			console.log(messageFromBackEnd)
		})

		this.setState({
			chatHistory: loadChat(auth.user._id, receiverId)
		})
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

		return (
			<Fragment>
				<div className="chat-header">
					<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
					<p>{ this.props.chat.receiver ? this.props.chat.receiver.name : null }</p>
				</div>
				<div className="chat-body">
					<div className="message-group">
						<p className="username">Modith Kavinda</p>
						<p className="message">Huththo mage sahan gen ath weyan keriya</p>
					</div>
					<div className="message-group owner">
						<p className="username owner">Thavindu Thathsara Samarasinghe</p>
						<p className="message">Sahan koheda wesa kariyo thoge wenne. Eya hamadama mage witharai. Mageema witharai. Kawadawath apiwa wen karanna ba. Sakkarayatawath ba. Tho mona hipaduwekda?</p>
					</div>
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
}

const mapStateToProps = state => ({
	auth: state.auth,
	chat: state.chat
})

export default connect(mapStateToProps, { setReceiver, loadChat })(ChatBox)