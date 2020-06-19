import axios from 'axios'
import { SET_RECEIVER, GET_CHAT_LIST, GET_CHAT } from './types'

export const setReceiver = (id) => dispatch => {
	axios.get(`http://localhost:5000/api/users/${id}`)
		.then(res => dispatch({
			type: SET_RECEIVER,
			payload: res.data
		}))
		.catch(err => console.log(err));
}

export const loadReceivers = (id) => dispatch => {
	axios.get(`http://localhost:5000/api/chats/chatlist/${id}`)
		.then(res => dispatch({
			type: GET_CHAT_LIST,
			payload: res.data
		}))
		.catch(err => console.log(err))
}

export const loadChat = (sender, receiver) => dispatch => {
	axios.get(`http://localhost:5000/api/chats/loadchat/${sender}/${receiver}`)
		.then(res => {
			console.log(res)
			return dispatch({
				type: GET_CHAT,
				payload: res.data
			})
		})
		.catch(err => console.log(err))
}