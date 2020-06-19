import { SET_RECEIVER, GET_CHAT_LIST, GET_CHAT } from '../actions/types'

const initialState = {
	receiver: null,
	receiversList: [],
	chatList: []
}

export default (state=initialState, action) => {
	switch(action.type) {
		case SET_RECEIVER:
			return {
				...state,
				receiver: action.payload
			}
		case GET_CHAT_LIST:
			return {
				...state,
				receiversList: action.payload
			}
		case GET_CHAT:
			return {
				...state,
				chatList: action.payload
			}
		default:
			return state
	}
}