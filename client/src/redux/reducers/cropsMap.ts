'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CropsMapProps = {
    id: number,
    cropName: string,
    price: number,
    img: string,
    farmerName: string,
    farmerLocation: string,
    farmerContact: number,
    city: string,
}

export type filterProps = {
    cropName: string | null,
    priceRange: { min: number, max: number } ,
    location: string

}

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
            if (action.payload.cropName === "All" || action.payload.cropName === "") {
                return;
            }
            state.cropList = state.cropList.filter((item) => item.cropName === action.payload.cropName);
            if (action.payload.priceRange.min === 0 && action.payload.priceRange.max === 0) {
                return;
            }
            state.cropList = state.cropList.filter((item) => item.price >= action.payload.priceRange.min && item.price <= action.payload.priceRange.max);
            if (action.payload.location === "All" || action.payload.location === "") {
                return;
            }
            state.cropList = state.cropList.filter((item) => item.city === action.payload.location);
        }
    },
});

export const cropMapAction = cropMapSlice.actions;
export default cropMapSlice.reducer;