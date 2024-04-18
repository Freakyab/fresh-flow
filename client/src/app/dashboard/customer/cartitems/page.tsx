"use client";
import React, { useEffect } from "react";
import useCustomerOrderCardItem from "@/redux/dispatch/useCustomerOrderCardItem";
import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";

function CartItems() {
  const {
    getOrderItems,
    removeOrderItem,
    clearOrderItems,
    customerOrderCartItemState,
    addQuantity,
    removeQuantity,
    onPay,
    setOrderItems,
  } = useCustomerOrderCardItem();
  const cartItem = getOrderItems();

  useEffect(() => {
    setOrderItems();
  }, []);

  return (
    <div className="m-3 bg-white rounded-xl p-3 w-full">
      <h1 className="text-3xl py-2">Shopping Cart</h1>
      <div className="flex gap-3 ">
        <div className="flex gap-3 flex-col">
          {/* <div className="flex-col flex"> */}
          {cartItem.map((item) => (
            <div key={item._id} className="w-full">
              <Card
                key={item._id}
                className="w-full h-full bg-light-bg shadow-lg">
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
                        <p className="text-lg line-clamp-2 text-nowrap">
                          Phone no. :
                          <Chip
                            color="primary"
                            variant="bordered"
                            className="ml-2">
                            {item.farmerContact}
                          </Chip>{" "}
                        </p>
                        <p className="text-lg line-clamp-2">
                          City:
                          <Chip
                            color="primary"
                            variant="bordered"
                            className="ml-2">
                            {item.city}
                          </Chip>
                        </p>
                        <p className="text-lg line-clamp-2">
                          Location:
                          <Chip
                            color="danger"
                            variant="bordered"
                            className="ml-2">
                            {item.location}
                          </Chip>
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-between bg-white shadow-xl rounded-xl p-2">
                        <h1 className="text-xl tracking-tight">Quantity</h1>
                        <div className="flex gap-3 items-center py-2">
                          <Button
                            className="bg-white w-fit  rounded-xl text-lg shadow-xl"
                            color="danger"
                            variant="bordered"
                            onClick={() => removeQuantity(item._id,item.crop)}>
                            -
                          </Button>
                          <p className="bg-white p-1 px-2 rounded-xl text-lg">
                            {item.availableQuantity}
                          </p>
                          <Button
                            className="bg-white w-fit rounded-xl text-lg shadow-xl"
                            color="danger"
                            variant="bordered"
                            onClick={() => addQuantity(item._id,item.crop)}>
                            +
                          </Button>
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
                <button onClick={() => removeOrderItem(item._id,item.crop)}>
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
    </div>
  );
}

export default CartItems;
