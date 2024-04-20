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
        console.log(order)
        // await fetch(`http://localhost:5000/cartItems/addOrder/${getUserDetails().userDetails._id}`, {
        await fetch(`https://fresh-flow-backend.vercel.app/cartItems/addOrder/${getUserDetails().userDetails._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
            body: JSON.stringify({ order }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isOrderAdded) {
                    console.log(data);
                    // dispatch(customerOrderCartItemAction.addOrderItem(order));
                } else {
                    console.log(data);
                }
            });

    };

    const removeOrderItem = async (id: string, crop: string) => {
        // await fetch(`http://localhost:5000/cartItems/removeOrder/${getUserDetails().userDetails._id}`, {
        await fetch(`https://fresh-flow-backend.vercel.app/cartItems/removeOrder/${getUserDetails().userDetails._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
            body: JSON.stringify({ id, crop })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isOrderRemoved) {
                    dispatch(customerOrderCartItemAction.removeOrderItem(id));
                } 
            });
        dispatch(customerOrderCartItemAction.removeOrderItem(id));
    };

    const addQuantity = async(id: string,crop :string) => {
        // await  fetch(`http://localhost:5000/cartItems/addQuantity/${getUserDetails().userDetails._id}`, {
        await  fetch(`https://fresh-flow-backend.vercel.app/cartItems/addQuantity/${getUserDetails().userDetails._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
            body: JSON.stringify({ id ,crop })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isQuantityAdded) {
                    // console.log(data);
                    dispatch(customerOrderCartItemAction.addQuantity(id));
                } else {
                    console.log(data);
                }
            });

        // dispatch(customerOrderCartItemAction.addQuantity(id));
    }

    const setOrderItems = async () => {
        // await fetch(`http://localhost:5000/cartItems/setOrderItems/${getUserDetails().userDetails._id}`, {
        await fetch(`https://fresh-flow-backend.vercel.app/cartItems/setOrderItems/${getUserDetails().userDetails._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isOrderFound) {
                    console.log(data.orderItems);
                    dispatch(customerOrderCartItemAction.setOrderItems(data.orderItems));
                } else {
                    console.log(data);
                }
            });
    }

    const removeQuantity = async(id: string,crop : string) => {
        // await fetch(`http://localhost:5000/cartItems/removeQuantity/${getUserDetails().userDetails._id}`, {
        await fetch(`https://fresh-flow-backend.vercel.app/cartItems/removeQuantity/${getUserDetails().userDetails._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
            body: JSON.stringify({ id,crop })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isQuantityRemoved) {
                    dispatch(customerOrderCartItemAction.removeQuantity(id));
                } else {
                    console.log(data);
                }
            });
        // dispatch(customerOrderCartItemAction.removeQuantity(id));
    };

    const getOrderItems = () => {
        return customerOrderCartItemState.orderItems;
    };

    const clearOrderItems = async() => {
        // await fetch(`http://localhost:5000/cartItems/clearOrderItems/${getUserDetails().userDetails._id}`, {
        await fetch(`https://fresh-flow-backend.vercel.app/cartItems/clearOrderItems/${getUserDetails().userDetails._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isOrderItemsCleared) {
                    dispatch(customerOrderCartItemAction.clearOrderItems());
                } else {
                    console.log(data);
                }
            });
        // dispatch(customerOrderCartItemAction.clearOrderItems());
    }

    const setOrderQuantity = async(id: string,quantity: number,crop :string) => {
        // await fetch(`http://localhost:5000/cartItems/setOrderQuantity/${getUserDetails().userDetails._id}`, {
        await fetch(`https://fresh-flow-backend.vercel.app/cartItems/setOrderQuantity/${getUserDetails().userDetails._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
            body: JSON.stringify({ id,quantity ,crop})
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.isQuantitySet) {
                    dispatch(customerOrderCartItemAction.setOrderQuantity({id,quantity}));
                } else {
                    console.log(data);
                }
            });
        // dispatch(customerOrderCartItemAction.setOrderQuantity({id,quantity}));
    }

    const onPay = async(totalAmount: number) => {
        await fetch(`http://localhost:5000/cartItems/onPay/${getUserDetails().userDetails._id}`, {
        // await fetch(`https://fresh-flow-backend.vercel.app/cartItems/onPay/${getUserDetails().userDetails._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "/",
            },
            body: JSON.stringify({ totalAmount })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.isPaid) {
                    dispatch(customerOrderCartItemAction.onPay(totalAmount));
                } else {
                    console.log(data);
                }
            });
        // dispatch(customerOrderCartItemAction.onPay(totalAmount));
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
        addQuantity,
        removeQuantity,
        onPay,
        getTotalSpend,
        setOrderItems,
        setOrderQuantity
    };

}

export default useCustomerOrderCardItem;
