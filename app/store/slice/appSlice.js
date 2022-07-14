import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    language: 'VN',
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        incrementCount: (state) => {
            state.count++;
        },
        resetCount: (state) => {
            state.count = 0;
        }
    },
})

export const { incrementCount, resetCount } = app.actions

export const asyncIncrementCount = () => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementCount())
      }, 3000)
}

export const selectCount = state => state.app.count;

export default app.reducer
