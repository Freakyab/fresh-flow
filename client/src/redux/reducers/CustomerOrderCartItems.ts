'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

const initialState: {
    orderItems: CropsMarketPlaceProps[],
    totalAmount: number
    totalSpendAmount: TotalSpend[];
} = {
    orderItems: [],
    totalAmount: 0,
    totalSpendAmount: []
};

const customerOrderCartItemSlice = createSlice({
    name: "customerOrderCartItem",
    initialState,
    reducers: {
        setOrderItems(state, action: PayloadAction<CropsMarketPlaceProps[]>) {
            state.orderItems = action.payload;
            state.totalAmount = action.payload.reduce((acc, item) => acc + item.price, 0);
        },
        addOrderItem(state, action: PayloadAction<CropsMarketPlaceProps>) {
            const item = action.payload;
            const existingItem = state.orderItems.find((orderItem) => orderItem._id === item._id);
            if (existingItem) {
                existingItem.availableQuantity += item.availableQuantity;
            } else {
                state.orderItems.push(item);
            }
            state.totalAmount += item.price;
        },
        removeOrderItem(state, action: PayloadAction<string>) {
            const item = state.orderItems.find((orderItem) => orderItem._id === action.payload);
            if (item) {
                state.totalAmount -= item.price * item.availableQuantity;
                state.orderItems = state.orderItems.filter((orderItem) => orderItem._id !== action.payload);
            }
        },
        clearOrderItems(state) {
            // state.totalSpendAmount = [];
            state.orderItems = [];
            state.totalAmount = 0;
        },
        addQuantity(state, action: PayloadAction<string>) {
            const item = state.orderItems.find((orderItem) => orderItem._id === action.payload);
            if (item) {
                item.availableQuantity += 1;
                state.totalAmount += item.price;
            }
        },
        removeQuantity(state, action: PayloadAction<string>) {
            const item = state.orderItems.find((orderItem) => orderItem._id === action.payload);
            if (item) {
                if (item.availableQuantity > 1) {
                    item.availableQuantity -= 1;
                } else {
                    state.orderItems = state.orderItems.filter((orderItem) => orderItem._id !== action.payload);
                }
                state.totalAmount -= item.price;
            }
        },
        onPay(state, action: PayloadAction<number>) {
            state.totalSpendAmount.push({
                price: action.payload,
                month: new Date().toLocaleString('default', { month: 'long' })
            });
            state.orderItems = [];
            state.totalAmount = 0;
        }
    },
});

export const customerOrderCartItemAction = customerOrderCartItemSlice.actions;
export default customerOrderCartItemSlice.reducer;