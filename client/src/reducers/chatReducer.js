import { SET_RECEIVER, GET_CHAT_LIST } from '../actions/types'

const initialState = {
	receiver: null,
	receiversList: []
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
		default:
			return state
	}
}