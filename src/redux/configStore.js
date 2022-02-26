import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import bucket from "./modules/bucket";


// 리듀서 모음
const rootReducer = combineReducers({ bucket });

// 미들웨어 모음 middlewares a미들웨어 여러개 넣을 수 있음
// 미들웨어 하나씩 풀어서 저장하겠따!
const middlewares = [ thunk ];
const enhancer = applyMiddleware( ...middlewares );

const store = createStore( rootReducer, enhancer );


export default store;
