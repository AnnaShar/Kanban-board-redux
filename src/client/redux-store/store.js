import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {boardReducer} from "./reducers/board-reducer.js";

export const store = createStore(boardReducer, applyMiddleware(thunk));
