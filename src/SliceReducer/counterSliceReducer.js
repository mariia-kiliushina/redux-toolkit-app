import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchQuote = createAsyncThunk('fetchStatus', async (id, thunkAPI) => {
  const response = await fetch(`https://dummyjson.com/quotes/${id}`).then((response) =>
    response.json()
  )
  return response.quote
})

const initialState = {
  cakesLeftTotal: 10,
  cakesLeftChoco: 2,
  cakesLeftVanilla: 5,
  cakesLeftPeanut: 3,
  error: '',
  quote: '',
  loading: false,
}

//includes immer by default so that we can 'mutate' state here

export const counterSliceReducer = createSlice({
  name: 'counterSlice',
  initialState,
  //reducers make a Reducer we export by default below in the code
  reducers: {
    //the above mentioned reducer's case that generates action creators
    sellCake: (state, action) => {
      if (state['cakesLeft' + action.payload] < 1) {
        state.error = `Sorry, we're out of ${action.payload} cakes!`
      } else {
        state['cakesLeft' + action.payload] -= 1
        state.cakesLeftTotal -= 1
      }
    },
    bakeCakes: (state) => {
      state.cakesLeftTotal += 10
      state.cakesLeftChoco += 2
      state.cakesLeftVanilla += 5
      state.cakesLeftPeanut += 3
      state.error = ''
    },
  },
  //2 ways to write extraReducers
  extraReducers: {
    [fetchQuote.pending]: (state) => {
      state.loading = true
    },
    [fetchQuote.fulfilled]: (state, action) => {
      state.quote = action.payload
      state.loading = false
    },
    [fetchQuote.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchQuote.pending, (state) => {
  //     state.loading = true
  //   })
  //   builder.addCase(fetchQuote.fulfilled, (state, action) => {
  //     state.quote = action.payload
  //     state.loading = false
  //   })
  //   builder.addCase(fetchQuote.rejected, (state, action) => {
  //     state.error = action.error.message
  //     state.loading = false
  //   })
  // },
})

//auto-generates the action types and action creators,
//based on the names of the reducers provided.

export const { sellCake, bakeCakes } = counterSliceReducer.actions

export default counterSliceReducer.reducer

// An alternative way of destructuring:
// const { actions, reducer } = counterSliceReducer
// export const { sellCake, bakeCake } = actions
// export default reducer
