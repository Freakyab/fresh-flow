import React from "react";
import { warehouseOrderType } from "../../../../components/dataSample/orderType";
import { Card, CardBody, Chip, CardFooter, Image } from "@nextui-org/react";

function page() {
  return (
    <div className="m-3  flex flex-col w-full h-full">
      <div className="flex">
        <div className="bg-white rounded-xl p-3">
          <p className="text-xl capitalize tracking-tighter ">Recent's Order</p>
          <div className="flex gap-3 p-3">
            {warehouseOrderType.map((order, index) => (
              <Card shadow="sm" key={index}>
                <CardBody className="flex justify-center gap-3">
                  <div className="flex gap-2">
                    Order no. :<Chip color="primary">{order._id}</Chip>
                  </div>
                  <div className="flex gap-2">
                    Farmer Name :
                    <Chip variant="bordered">{order.farmerName}</Chip>
                  </div>
                  <div className="flex gap-2">
                    Crop :<Chip color="primary">{order.crop}</Chip>
                  </div>
                  <div className="flex gap-2">
                    Quantity :<Chip color="primary">{order.quantity}</Chip>
                  </div>
                  <div className="flex gap-2">
                    Price :<Chip color="primary">{order.price}</Chip>
                  </div>
                  <div className="flex gap-2">
                    Duration :<Chip color="primary">{order.duration}</Chip>
                  </div>
                  <div className="flex gap-2">
                    Status :
                    <Chip
                      variant="bordered"
                      color={`${
                        order.status === "pending"
                          ? "danger"
                          : order.status === "accepted"
                          ? "success"
                          : "warning"
                      }`}>
                      {order.status}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-3">
          <p className="text-xl capitalize tracking-tighter ">Settings</p>
        </div>
      </div>
    </div>
  );
}

export default page;
