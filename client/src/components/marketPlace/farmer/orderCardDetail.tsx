"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Divider,
} from "@nextui-org/react";
import handleToast from "@/components/toastifyNotification";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderCardDetail(order: transactionProps) {
  const pathname = usePathname();
  const handleAccept = async () => {
    // await fetch(`http://localhost:5000/transaction/accept/${order._id}`, {
    await fetch(
      `https://fresh-flow-backend.vercel.app/transaction/accept/${order._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        handleToast(data.message, "success");
      })
      .catch((err) => {
        handleToast(err.message, "error");
      });
  };

  const handleReject = async () => {
    // await fetch(`http://localhost:5000/transaction/reject/${order._id}`, {
    await fetch(
      `https://fresh-flow-backend.vercel.app/transaction/reject/${order._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        handleToast(data.message, "success");
      })
      .catch((err) => {
        handleToast(err.message, "error");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="border-none mb-3 bg-light-bg" shadow="lg">
        <CardBody className="flex justify-center text-nowrap gap-3">
          <div className="flex gap-2">
            Order no. :
            <Chip color="primary" variant="bordered">
              {order._id}
            </Chip>
          </div>
          {!order.customerName && (
            <div className="flex gap-2">
            Status :
            <Chip
              // variant="bordered"
              color={`${
                order.status === "pending"
                  ? "danger"
                  : order.status === "accepted"
                  ? "success"
                  : "warning"
              }`}>
              {order.status}
            </Chip>
          </div>)}
          {!order.customerName ? (
            <div className="flex gap-2">
              Farmer Name :<Chip variant="bordered">{order.farmerName}</Chip>
            </div>
          ) : (
            <div className="flex gap-2">
              Customer Name :
              <Chip variant="bordered">{order.customerName}</Chip>
            </div>
          )}
          <div className="flex gap-2">
            CreatedAt :
            <Chip color="primary">{order.createdAt.slice(0, 10)}</Chip>
          </div>
          <div className="flex gap-2">
            Quantity :
            <Chip color="primary" variant="bordered">
              {order.quantity}
            </Chip>
          </div>
          <div className="flex gap-2">
            Price :
            <Chip color="primary" variant="bordered">
              {order.price}
            </Chip>
          </div>
          {order.duration && (<div className="flex gap-2">
            Duration :
            <Chip color="primary" variant="bordered">
              {order.duration}
            </Chip>
          </div>)}
          <div className="flex gap-2">
            Type of Crop :
            <Chip color="primary" variant="bordered">
              {order.typeOfCrop}
            </Chip>
          </div>
          
        </CardBody>
        <Divider />
                {order.status === "pending" && pathname.split('/')[2] == 'warehouse'  && (
          <CardFooter className="flex justify-end items-center gap-3 bg-light-bg">
            <Button
              color="success"
              variant="shadow"
              className="text-white"
              onClick={handleAccept}>
              Accept
            </Button>
            <Button
              color="danger"
              className="text-white"
              variant="shadow"
              onClick={handleReject}>
              Reject
            </Button>
          </CardFooter>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
}

export default OrderCardDetail;
