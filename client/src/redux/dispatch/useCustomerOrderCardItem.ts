'use client';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { customerOrderCartItemAction } from '@/redux/reducers/CustomerOrderCartItems';
import useUserDetails from "@/redux/dispatch/useUserDetails";
const useCustomerOrderCardItem = () => {

    const customerOrderCartItemState = useSelector((state: RootState) => state.customerOrderCartItem);
    const dispatch = useDispatch<AppDispatch>();
    const { getUserDetails } = useUserDetails();

    const addOrderItem = async (order: CropsMarketPlaceProps) => {
        try {

            const response =
                await fetch(`https://fresh-flow-backend.vercel.app/cartItems/addOrder/${getUserDetails().userDetails._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "/",
                    },
                    body: JSON.stringify({ order }),
                })
            const responseJson = await response.json();
            if (responseJson.isOrderAdded) {
                dispatch(customerOrderCartItemAction.addOrderItem(order));
            }
            return responseJson;
        } catch (err) {
            return {
                isOrderAdded: false,
                message: "An error occured while adding order item"
            }
        }

    };

    const removeOrderItem = async (id: string, crop: string) => {
        try {
            const response =
                await fetch(`https://fresh-flow-backend.vercel.app/cartItems/removeOrder/${getUserDetails().userDetails._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "/",
                    },
                    body: JSON.stringify({ id, crop })
                })

            const responseJson = await response.json();
            if (responseJson.isOrderRemoved) {
                dispatch(customerOrderCartItemAction.removeOrderItem(id));
            }
            return responseJson;
        } catch (err) {
            return {
                isOrderRemoved: false,
                message: "An error occured while removing order item"
            }
        }
    };

    // const addQuantity = async (id: string, crop: string) => {
    //     // await  fetch(`https://fresh-flow-backend.vercel.app/cartItems/addQuantity/${getUserDetails().userDetails._id}`, {
    //     await fetch(`https://fresh-flow-backend.vercel.app/cartItems/addQuantity/${getUserDetails().userDetails._id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             accept: "/",
    //         },
    //         body: JSON.stringify({ id, crop })
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             if (data.isQuantityAdded) {
    //                 // console.log(data);
    //                 dispatch(customerOrderCartItemAction.addQuantity(id));
    //             }
    //         });

    //     // dispatch(customerOrderCartItemAction.addQuantity(id));
    // }

    const setOrderItems = async () => {
        try {
            const response =
                await fetch(`https://fresh-flow-backend.vercel.app/cartItems/setOrderItems/${getUserDetails().userDetails._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "/",
                    },
                })
            const responseJson = await response.json();
            if (responseJson.isOrderFound) {
                dispatch(customerOrderCartItemAction.setOrderItems(responseJson.orderItems));
            }
            return responseJson;
        }
        catch (err) {
            return {
                isOrderFound: false,
                message: "An error occured while setting order items"
            }
        }
    }

    // const removeQuantity = async (id: string, crop: string) => {
    //     // await fetch(`https://fresh-flow-backend.vercel.app/cartItems/removeQuantity/${getUserDetails().userDetails._id}`, {
    //     await fetch(`https://fresh-flow-backend.vercel.app/cartItems/removeQuantity/${getUserDetails().userDetails._id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             accept: "/",
    //         },
    //         body: JSON.stringify({ id, crop })
    //     })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             if (data.isQuantityRemoved) {
    //                 dispatch(customerOrderCartItemAction.removeQuantity(id));
    //             }
    //         });
    //     // dispatch(customerOrderCartItemAction.removeQuantity(id));
    // };

    const getOrderItems = () => {
        return customerOrderCartItemState.orderItems;
    };

    const clearOrderItems = async () => {
        try {
            const response =
                await fetch(`https://fresh-flow-backend.vercel.app/cartItems/clearOrderItems/${getUserDetails().userDetails._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "/",
                    },
                })
            const responseJson = await response.json();
            if (responseJson.isOrderCleared) {
                dispatch(customerOrderCartItemAction.clearOrderItems());
            }
            return responseJson;
        }
        catch (err) {
            return {
                isOrderCleared: false,
                message: "An error occured while clearing order items"
            }
        }
    }

    const setOrderQuantity = async (id: string, quantity: number, crop: string) => {
        try {
            const response =
                await fetch(`https://fresh-flow-backend.vercel.app/cartItems/setOrderQuantity/${getUserDetails().userDetails._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "/",
                    },
                    body: JSON.stringify({ id, quantity, crop })
                })

            const responseJson = await response.json();
            if (responseJson.isQuantitySet) {
                dispatch(customerOrderCartItemAction.setOrderQuantity({ id, quantity }));
            }
            return responseJson;
        }
        catch (err) {
            return {
                isQuantitySet: false,
                message: "An error occured while setting order quantity"
            }
        }
    }

    const onPay = async (totalAmount: number) => {
        try {
            const response =
                await fetch(`https://fresh-flow-backend.vercel.app/cartItems/onPay/${getUserDetails().userDetails._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "/",
                    },
                    body: JSON.stringify({ totalAmount })
                })
            const responseJson = await response.json();
            if (responseJson.isPaid) {
                dispatch(customerOrderCartItemAction.onPay(totalAmount));
            }
            return responseJson;
        }
        catch (err) {
            return {
                isPaid: false,
                message: "An error occured while paying"
            }
        }
    }

    const getTotalSpend = () => {
        return customerOrderCartItemState.totalSpendAmount;
    }

    return {
        customerOrderCartItemState,
        addOrderItem,
        removeOrderItem,
        getOrderItems,
        clearOrderItems,
        // removeQuantity,
        onPay,
        getTotalSpend,
        setOrderItems,
        setOrderQuantity
    };

}

export default useCustomerOrderCardItem;
