import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdd: false,
    isDeleted: false,
    isDone: false,
    idEdit: null,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        AddItem: (state, action) => {
            state.isAdd = action.payload;
        },
        DeleteItem: (state, action) => {
            state.isDeleted = action.payload;
        },
        DoneItem: (state, action) => {
            state.isDone = action.payload;
        },
        EditItem: (state, action) => {
            state.isEdit = action.payload.isEdit;
            state.idEdit = action.payload.id;
        }
    }
})

export default commonSlice.reducer;
export const { AddItem, DeleteItem, DoneItem, EditItem } = commonSlice.actions;