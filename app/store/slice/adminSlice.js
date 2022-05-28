import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIManager from '../../controller/APIManager';

export const requestErrorEquipment = createAsyncThunk(
    'app/requestErrorEquipment',
    async ({id, reason}) => {
        try {
            const response = await APIManager.requestError({id, reason});
            return response;
        } catch (e) {
            return e;
        }
    }
)

const initialState = {
    notificationlists: []
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
    extraReducers: {
        [requestErrorEquipment.pending]: (state, action) => {
            state.notificationlists = []
        },
        [requestErrorEquipment.fulfilled]: (state, action) => {
            state.notificationlists = action.payload;
        },
        [requestErrorEquipment.rejected]: (state, action) => {
            state.notificationlists = []
        },
    },
})

export default app.reducer;