'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 



const initialState: {
    orderItems: CustomerOrderCartItemsProps[],
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
        addOrderItem(state, action: PayloadAction<CustomerOrderCartItemsProps>) {
            const item = action.payload;
            const existingItem = state.orderItems.find((orderItem) => orderItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.orderItems.push(item);
            }
            state.totalAmount += item.price;
        },
        removeOrderItem(state, action: PayloadAction<number>) {
            const item = state.orderItems.find((orderItem) => orderItem.id === action.payload);
            if (item) {
                state.totalAmount -= item.price * item.quantity;
                state.orderItems = state.orderItems.filter((orderItem) => orderItem.id !== action.payload);
            }
        },
        clearOrderItems(state) {
            // state.totalSpendAmount = [];
            state.orderItems = [];
            state.totalAmount = 0;
        },
        addQuantity(state, action: PayloadAction<number>) {
            const item = state.orderItems.find((orderItem) => orderItem.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalAmount += item.price;
            }
        },
        removeQuantity(state, action: PayloadAction<number>) {
            const item = state.orderItems.find((orderItem) => orderItem.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.orderItems = state.orderItems.filter((orderItem) => orderItem.id !== action.payload);
                }
                state.totalAmount -= item.price;
            }
        },
        onPay(state, action: PayloadAction<number>) {
            console.log(state.totalSpendAmount);
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