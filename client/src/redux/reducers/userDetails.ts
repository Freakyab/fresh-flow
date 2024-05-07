"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    userDetails: {
        username: string;
        _id: string;
        token: string;
        type : string;
    };
} = {
    userDetails: {
        username: "",
        _id: "",
        token: "",
        type : ""
    }
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        signup(state, action: PayloadAction<{ username: string; _id: string ,token : string,type: string}>) {
            state.userDetails = action.payload;
        },
        logout(state) {
            state.userDetails = {
                username: "",
                _id: "",
                token: "",
                type : ""
            };
        },
    },
});

export const userDetailsAction = userDetailsSlice.actions;
export default userDetailsSlice.reducer;