"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  Chip,
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
  const [isLoaded, setIsLoaded] = useState(false);
  const quantityArray = ["50", "100", "150", "200", "250", "300"];
  const {
    getOrderItems,
    removeOrderItem,
    clearOrderItems,
    customerOrderCartItemState,
    setOrderQuantity,
    onPay,
    setOrderItems,
  } = useCustomerOrderCardItem();

  const cartItem = getOrderItems();
  useEffect(() => {
    setOrderItems();
    toggleLoad();
  }, []);

  const [status, setStatus] = useState([] as string[]);

  useEffect(() => {
    setStatus(cartItem.map((item) => (item.availableQuantity * 50).toString()));
  }, [cartItem]);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    _id: string,
    index: number
  ) => {
    const newStatus = [...status];
    newStatus[index] = e.target.value.toString();
    const quantity = parseInt(e.target.value) / 50;
    if (!quantity) return;
    setOrderQuantity(_id, quantity, cartItem[index].crop);
  };

  return (
    <div className="m-3 bg-white rounded-xl p-3 w-full">
      <Skeleton className="w-full h-full" isLoaded={isLoaded}>
        <h1 className="text-3xl py-2">Shopping Cart</h1>
        <div className="flex gap-3 ">
          <div className="flex gap-3 flex-col">
            {/* <div className="flex-col flex"> */}
            {cartItem.map((item, index) => (
              <div key={index} className="w-full">
                <Card className="w-full h-full bg-light-bg shadow-lg">
                  <CardBody className="flex flex-row">
                    <div>
                      <Image
                        src={item.image}
                        alt="crop"
                        width={300}
                        height={300}
                        className="h-full object-cover mb-3 rounded-xl shadow-xl"
                      />
                    </div>
                    <div className="px-3 flex w-full flex-col gap-3 justify-between">
                      <h1 className="text-xl font-medium tracking-wide line-clamp-1">
                        {item.crop} - By {item.farmerName}
                      </h1>
                      <Divider />
                      <div className="flex">
                        <div className="mx-3 bg-white w-[60%] flex flex-col justify-center gap-3 shadow-xl rounded-xl p-2">
                          <h2 className="text-xl tracking-tight">Details</h2>
                          <span className="text-lg line-clamp-2 text-nowrap">
                            Phone no. :
                            <Chip
                              color="primary"
                              variant="bordered"
                              className="ml-2">
                              {item.farmerContact}
                            </Chip>{" "}
                          </span>
                          <span className="text-lg line-clamp-2">
                            City:
                            <Chip
                              color="primary"
                              variant="bordered"
                              className="ml-2">
                              {item.city}
                            </Chip>
                          </span>
                          <span className="text-lg line-clamp-2">
                            Location:
                            <Chip
                              color="danger"
                              variant="bordered"
                              className="ml-2">
                              {item.location}
                            </Chip>
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-between bg-white shadow-xl rounded-xl p-2">
                          <h1 className="text-xl tracking-tight">Quantity</h1>
                          <div className="w-full">
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
                                  <SelectItem key={quantity} value={quantity}>
                                    {quantity}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <p>Price : </p>
                            <Button
                              className="bg-white p-1 px-2 rounded-xl text-lg"
                              color="success"
                              variant="bordered">
                              {"₹"}
                              {item.price}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <button onClick={() => removeOrderItem(item._id, item.crop)}>
                    Remove
                  </button>
                </Card>
              </div>
            ))}
            {/* </div> */}
          </div>
          <div className="w-fit h-fit bg-light-bg shadow-lg rounded-xl p-3">
            <div className="flex flex-col justify-center gap-3">
              <p className="text-xl font-semibold">Total Cost</p>
              <span className="text-lg font-semibold">
                Total Items: {cartItem.length}
              </span>
              <span className="text-lg font-semibold">
                Total Amount: {customerOrderCartItemState.totalAmount}
              </span>
              <Button
                color="success"
                variant="bordered"
                onClick={() => {
                  cartItem.length !== 0
                    ? handleToast("Checkout", "success")
                    : handleToast("Cart is empty", "error");
                  onPay(customerOrderCartItemState.totalAmount);
                }}>
                Checkout
              </Button>
              <Button onClick={clearOrderItems}>Clear</Button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Skeleton>
    </div>
  );
}

export default CartItems;
