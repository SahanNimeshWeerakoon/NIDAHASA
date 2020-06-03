import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FaTelegramPlane } from 'react-icons/fa'

const ChatBox = ({ isAdmin }) => {
	return (
		<Fragment>
			<div className="chat-header">
				<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
				<p>Thavindu Thathsara Samarasinghe</p>
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
				<div className="message-group">
					<p className="username">Modith Kavinda</p>
					<p className="message">Ha ehenan sorry. Eya oyage thamai. Mata samawenna. Aai oyalata wada denna enne na mama. Bye. Sahan ekka parissamin inna. </p>
				</div>
			</div>
			<div className="chat-footer">
				<input type="text" name="chat_message" placeholder="Type here...." />
				<button><FaTelegramPlane /></button>
			</div>
		</Fragment>
	)
}

export default connect()(ChatBox)