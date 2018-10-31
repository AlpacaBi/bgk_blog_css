import {createStore,applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index'

import rootSages from './sagas/index'

const sagaMiddleware=createSagaMiddleware()

let store=createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSages)

export default store