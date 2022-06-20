import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import counterReducer from './counterSliceReducer'
import Thunk from 'redux-thunk'

// includes redux-thunk by default
export const store = configureStore({
  reducer: {
    counterReducer,
  },
  middleware: [logger, Thunk],
})
