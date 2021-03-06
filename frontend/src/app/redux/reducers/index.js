import {
	createStore, applyMiddleware, combineReducers, compose,
} from 'redux';

import user from './user';
import room from './room';

const reducer = combineReducers({
	user,
	room,
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
