'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: {
    cropList: CropsMapProps[]
} = {
    cropList: []
};

const cropMapSlice = createSlice({
    name: "cropMap",
    initialState,
    reducers: {
        setCrops(state, action: PayloadAction<CropsMapProps[]>) {
            state.cropList = action.payload;
        },
        setfilter(state, action: PayloadAction<filterProps>) {
            if (action.payload.cropName !== "All" && action.payload.cropName !== "") {
                state.cropList = state.cropList.filter((item) => item.cropName === action.payload.cropName);
            }
            if (action.payload.priceRange.min !== 0 && action.payload.priceRange.max !== 0) {
                state.cropList = state.cropList.filter((item) => item.price >= action.payload.priceRange.min && item.price <= action.payload.priceRange.max);
            }
            if (action.payload.location !== "All" && action.payload.location !== "") {
                state.cropList = state.cropList.filter((item) => item.city === action.payload.location);
            } else {
                return;
            }
        }
    },
});

export const cropMapAction = cropMapSlice.actions;
export default cropMapSlice.reducer;