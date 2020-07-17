import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'
import createSagaMiddleware from 'redux-saga'
import { sagaWatcher } from './sagas'

const saga = createSagaMiddleware()

const store = createStore(rootReducer(), applyMiddleware(saga))

saga.run(sagaWatcher)

export default store
