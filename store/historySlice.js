import { createSlice } from "@reduxjs/toolkit";

const history = createSlice({
    name: "memorise",
    initialState: {
        items: {},
    },
    reducers: {
        addMemoItem: (state, action) => {
            const {item} = action.payload;
            if (item) {
                item > 10 && 'moreThan10' in state.items === false ? state.items.moreThan10 = 1 : item > 10 ? state.items['moreThan10']++ : item in state.items ? state.items[item]++ : state.items[item] = 1;
            }
        },
        saveMemo: (state, action) => {
            state.items = action.payload.items;
        },
    }
});

export const { addMemoItem, saveMemo } = history.actions;
export default history.reducer;