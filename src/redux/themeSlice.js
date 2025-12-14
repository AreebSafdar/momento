import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: { theme:"light"},
    reducers : {
        updateTheme: (state, action) => {
            state.theme = action.payload.theme;
        },
    },
});
 export const { updateTheme } = themeSlice.actions;
 export default themeSlice.reducer;