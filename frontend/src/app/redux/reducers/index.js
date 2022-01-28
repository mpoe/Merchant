import {
	createStore, applyMiddleware, combineReducers, compose,
} from 'redux';

import room from './room';
import user from './user';

const reducer = combineReducers({
	room,
	user,
});

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(),
	),
);

export default store;
