import { createSlice } from "@reduxjs/toolkit";

const switchesSlice = createSlice({
    name: "switches",
    initialState: {
        nilOnFront: false,
        engLang: false
    },
    reducers: {
        setNilOnFront: (state, action) => {
            state.nilOnFront = action.payload;
            // console.log("nilOnFront: ", state.nilOnFront)
        },
        setEngLang: (state, action) => {
            state.engLang = action.payload;
            // console.log('engLeng: ', state.engLang)
        }
    }
})

export const { setEngLang, setNilOnFront } = switchesSlice.actions;
export default switchesSlice.reducer;