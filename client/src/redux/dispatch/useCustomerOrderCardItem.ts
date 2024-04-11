'use client';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { customerOrderCartItemAction } from '@/redux/reducers/CustomerOrderCartItems';

const  useCustomerOrderCardItem = () => {

    const customerOrderCartItemState = useSelector((state: RootState) => state.customerOrderCartItem);
    const dispatch = useDispatch<AppDispatch>();

    const addOrderItem = (orderItem: CustomerOrderCartItemsProps) => {
        dispatch(customerOrderCartItemAction.addOrderItem(orderItem));
    };

    const removeOrderItem = (id: number) => {
        dispatch(customerOrderCartItemAction.removeOrderItem(id));
    };

    const addQuantity = (id: number) => {
        dispatch(customerOrderCartItemAction.addQuantity(id));
    }

    const removeQuantity = (id: number) => {
        dispatch(customerOrderCartItemAction.removeQuantity(id));
    };

    const getOrderItems = () => {
        return customerOrderCartItemState.orderItems;
    };

    const clearOrderItems = () => {
        dispatch(customerOrderCartItemAction.clearOrderItems());
    }

    const onPay = (totalAmount: number) => {
        dispatch(customerOrderCartItemAction.onPay(totalAmount));
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
        getTotalSpend
    };

}

export default useCustomerOrderCardItem;
