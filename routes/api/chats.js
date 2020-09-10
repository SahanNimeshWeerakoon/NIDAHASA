const express = require('express');
const router = express.Router();
const Chat = require('../../models/Chat');
const User = require('../../models/User');

// get the chated people list to ChatList Component
router.get('/chatlist/:id', (req, res) => {
	const id = req.params.id
	Chat.find({ "sender": id })
		.distinct('receiver')
		.then(recIds => {
			Chat.find({ "receiver": id })
				.distinct('sender')
				.then(senIds => {

					let searchIds = [
						...recIds,
						...senIds
					];

					User.find({ '_id': { $in: searchIds } })
						.then(users => {
							res.json(users)
						})
						.catch(err => console.log(err));
				})
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