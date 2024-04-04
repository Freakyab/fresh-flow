import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    FlyOn : {
        lat: number,
        lng: number
    },
    search : string,
    loc : {
        lat: number,
        lng: number
    },
    isClicked : boolean,
}= {
    FlyOn : {
        lat: 0,
        lng: 0
    },
    search : "",
    loc : {
        lat: 0,
        lng: 0
    },
    isClicked : false,
};

const mapLoadingSlice = createSlice({
    name    : "mapLoading",
    initialState,
    reducers: {
        // All set functions are reducers
        setFlyOn(state, action: PayloadAction<{ lat: number, lng: number }>) {
            state.FlyOn = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setLoc(state, action: PayloadAction<{ lat: number, lng: number }>) {
            state.loc = action.payload;
        },
        setIsClicked(state, action: PayloadAction<boolean>) {
            state.isClicked = action.payload;
        },
    },
});

export const mapLoadingAction = mapLoadingSlice.actions;
export default mapLoadingSlice.reducer;