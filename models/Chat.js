const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	message: {
		type: String
	},
	sender: {
		type: String,
		ref: 'User'
	},
	receiver: {
		type: String,
		ref: 'User'
	},
	type: {
		type: String
	}
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema)