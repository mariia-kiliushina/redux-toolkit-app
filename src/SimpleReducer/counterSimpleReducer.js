import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit'

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
}

export const sellCake = createAction('sellCake')
export const bakeCakes = createAction('bakeCakes')

//includes immer by default so that we can 'mutate' state here

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(sellCake, (state, action) => {
      if (state['cakesLeft' + action.payload] < 1) {
        state.error = `Sorry, we're out of ${action.payload} cakes!`
      } else {
        state['cakesLeft' + action.payload] -= 1
        state.cakesLeftTotal -= 1
      }
    })

    .addCase(bakeCakes, (state) => {
      state.cakesLeftTotal += 10
      state.cakesLeftChoco += 2
      state.cakesLeftVanilla += 5
      state.cakesLeftPeanut += 3
      state.error = ''
    })

    .addCase(fetchQuote.fulfilled, (state, action) => {
      state.quote = action.payload
      state.loading = false
    })

    .addCase(fetchQuote.pending, (state) => {
      state.loading = true
    })

    .addCase(fetchQuote.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    })
})

export default counterReducer
