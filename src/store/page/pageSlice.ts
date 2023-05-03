import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface IPage {
    message: string;
}

export const initialState: IPage = {
    message: '',
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        resetPage: () => {
            return initialState;
        },
    },
});

// Selectors
export const getMessage = (state: RootState) => state.page.message;

// Actions
export const {
    setMessage,
    resetPage,
} = pageSlice.actions;

// Reducer
export default pageSlice.reducer;
