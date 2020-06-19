const express = require('express');
const router = express.Router();
const Chat = require('../../models/Chat');
const User = require('../../models/User');

// get the chated people list to ChatList Component
router.get('/chatlist/:id', (req, res) => {
	console.log('chat list requested');
	Chat.find({ "sender": req.params.id })
		.distinct('receiver')
		.then(data => {
			User.find({ '_id': { $in: data } })
				.then(users => res.json(users))
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

// Get the previous chat for the ChatBox component
router.get('/loadchat/:sender/:receiver', (req, res) => {
	const sender = req.params.sender;
	const receiver = req.params.receiver;

	Chat.find({ $or: [
			{ sender },
			{ receiver },
			{ 'sender': receiver },
			{ 'receiver': sender }
		] })
		.then(chats => {
			res.json(chats);
		})
		.catch(err => console.log(err))
})
		

module.exports = router;