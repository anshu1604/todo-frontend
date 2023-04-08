import { configureStore } from '@reduxjs/toolkit'
import CommonReducer from '../app/commonSlice';

export const store = configureStore({
    reducer: {
        common: CommonReducer,
    },
})