"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    userDetails: {
        username: string;
        _id: string;
        token: string;
    };
} = {
    userDetails: {
        username: "",
        _id: "",
        token: "",
    }
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        signup(state, action: PayloadAction<{ username: string; _id: string ,token : string}>) {
            state.userDetails = action.payload;
        },
        logout(state) {
            state.userDetails = {
                username: "",
                _id: "",
                token: "",
            };
        },
    },
});

export const userDetailsAction = userDetailsSlice.actions;
export default userDetailsSlice.reducer;