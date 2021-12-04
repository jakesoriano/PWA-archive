import createStore from 'unistore';
import devtools from 'unistore/devtools';
import { initialStore } from './initialStore';

const store =
	process.env.NODE_ENV === 'production'
	  ? createStore(initialStore)
	  : devtools(createStore(initialStore));

export default store;
