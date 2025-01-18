"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";

import useCustomerOrderCardItem from "@/redux/dispatch/useCustomerOrderCardItem";

import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";

function CartItems() {
  const [isLoaded, setIsLoaded] = useState(true);
  const quantityArray = ["50", "100", "150", "200", "250", "300"];
  const {
    removeOrderItem,
    clearOrderItems,
    getOrderItems,
    customerOrderCartItemState,
    setOrderQuantity,
    onPay,
    setOrderItems,
  } = useCustomerOrderCardItem();
  const [cartItem, setCartItems] = useState([] as CropsMarketPlaceProps[]);

  const [status, setStatus] = useState([] as string[]);

  useEffect(() => {
    const fetchTheCartItems = async () => {
      const response = await setOrderItems();
      if (!response.isOrderFound) {
        handleToast({ message: response.message, type: "info" });
      }
      const cartArray = getOrderItems();
      const statusArray = [];
      for (let i = 0; i < cartArray.length; i++) {
        statusArray.push((cartArray[i].availableQuantity * 50).toString());
      }
      setStatus(statusArray);
      setIsLoaded(false);
      setCartItems(cartArray);
    };

    if (isLoaded) {
      fetchTheCartItems();
    }
  }, [cartItem, customerOrderCartItemState, isLoaded]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    _id: string,
    index: number
  ) => {
    const newStatus = [...status];
    newStatus[index] = e.target.value.toString();
    const quantity = parseInt(e.target.value) / 50;
    if (!quantity) return;
    const response = await setOrderQuantity(
      _id,
      quantity,
      cartItem[index].crop
    );
    if (!response.isQuantitySet) {
      handleToast({ message: response.message, type: "error" });
    }
    setStatus(newStatus);
  };

  const handleRemove = async (id: string, crop: string) => {
    const response = await removeOrderItem(id, crop);
    handleToast({
      message: response.message,
      type: response.isOrderRemoved ? "success" : "error",
    });
    setIsLoaded(true);
  };

  const handleClearCart = async () => {
    const response = await clearOrderItems();
    handleToast({
      message: response.message,
      type: response.isOrderCleared ? "success" : "error",
    });
    setIsLoaded(true);
  };

  const handleChckout = async () => {
    if (cartItem.length === 0) {
      handleToast({ message: "Cart is Empty", type: "info" });
      return;
    }
    const response = await onPay(customerOrderCartItemState.totalAmount);
    handleToast({
      message: response.message,
      type: response.isPaid ? "success" : "error",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Skeleton className="w-full" isLoaded={!isLoaded}>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {cartItem.map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardBody className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="w-full md:w-48">
                        <img
                          src={item.image}
                          alt={item.crop}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <div className="flex flex-col h-full">
                          <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                              {item.crop}
                            </h2>
                            <p className="text-sm text-gray-600">
                              by {item.farmerName}
                            </p>
                          </div>

                          <Divider className="my-3" />

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Details */}
                            <div className="space-y-2">
                              <h3 className="font-medium text-gray-900">
                                Details
                              </h3>
                              <p className="text-sm text-gray-600">
                                Phone:{" "}
                                <span className="text-blue-600">
                                  {item.farmerContact}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                City:{" "}
                                <span className="text-blue-600">
                                  {item.city}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Location:{" "}
                                <span className="text-red-600">
                                  {item.location}
                                </span>
                              </p>
                            </div>

                            {/* Quantity and Price */}
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-medium text-gray-900 mb-2">
                                  Quantity
                                </h3>
                                {status.length !== 0 && (
                                  <Select
                                    key={index}
                                    name="quantity"
                                    label="Quantity in Kg's"
                                    defaultSelectedKeys={[status[index]]}
                                    onChange={(e) =>
                                      handleChange(e, item._id, index)
                                    }>
                                    {quantityArray.map((quantity) => (
                                      <SelectItem
                                        key={quantity}
                                        value={quantity}>
                                        {quantity}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Price:</span>
                                <span className="text-lg font-semibold text-green-600">
                                  ₹{item.price}
                                  <span className="text-sm text-gray-600">
                                    / 50 kg
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="mt-4">
                            <Button
                              onClick={() => handleRemove(item._id, item.crop)}
                              className="text-red-600 hover:text-red-700"
                              variant="ghost">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white sticky top-6">
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-semibold">{cartItem.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-semibold">
                        ₹{customerOrderCartItemState.totalAmount}
                      </span>
                    </div>
                    <Divider className="my-4" />
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleChckout}>
                      Proceed to Checkout
                    </Button>
                    <Button
                      className="w-full"
                      variant="ghost"
                      onClick={handleClearCart}>
                      Clear Cart
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Skeleton>
    </div>
  );
}

export default CartItems;
