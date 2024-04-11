'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    id : number,
   orderList : farmerOrderListProps[],
} = {
    id : 0,
    orderList: [],
};

const farmerOrderListSlice = createSlice({
    name: "farmerOrderList",
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<farmerOrderListProps>) {
            state.orderList.push(action.payload);
        },
        removeOrder(state, action: PayloadAction<number>) {
            state.orderList = state.orderList.filter((order) => order.id !== action.payload);
        },
        clearOrder(state) {
            state.orderList = [];
        },
    },
});
