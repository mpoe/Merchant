// @ts-check
import { SET_USER_ID } from '../actions/actionTypes';

const defaultState = {
    user: {},
};

export default function user(state = defaultState, action) {
	switch (action.type) {
	case SET_USER_ID:
        return {
            ...state,
            id: action.payload,
            username: 'Mpoe',
        }
	default:
		return state;
	}
}
