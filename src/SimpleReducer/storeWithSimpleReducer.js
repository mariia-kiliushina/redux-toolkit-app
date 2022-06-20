import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import counterReducer from './counterSimpleReducer'
import Thunk from 'redux-thunk'

// includes redux-thunk by default
export const store = configureStore({
  reducer: {
    counterReducer,
  },
  middleware: [logger, Thunk],
})

//reducer: exepts rootReducer of already combined reducers or an object {,,,} with reducers
/// and  configureStore will call combineReducers
