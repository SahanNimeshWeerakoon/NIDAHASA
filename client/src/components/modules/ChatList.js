import React, { Fragment } from 'react'

const ChatList = () => {
	return (
		<Fragment>
			<div className="chat-list-header">
				<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
				<p>Sahan Nimesh Weerakoon</p>
			</div>
			<div className="chat-list-body">
				<div className="user active">
					<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
					<p>Thavindu Thathsara Samarasinghe</p>
				</div>
				<div className="user">
					<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
					<p>Modith kavinda Gamaathige</p>
				</div>
				<div className="user">
					<img src={`http://localhost:5000/images/profile/noImage.png`} title="Admin title" alt="Admin title" />
					<p>Tharindu Bandara</p>
				</div>
			</div>
		</Fragment>
	)
}

export default ChatList