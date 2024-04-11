import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
function OrderCardDetail(order: transactionProps) {
  return (
    <div>
      <Card shadow="sm" className="bg-light-bg">
        <CardBody className="flex justify-center text-nowrap gap-3">
          <div className="flex gap-2">
            Order no. :<Chip color="primary">{order._id}</Chip>
          </div>
          <div className="flex gap-2">
            Farmer Name :<Chip variant="bordered">{order.farmerName}</Chip>
          </div>
          <div className="flex gap-2">
            CreatedAt :
            {/* <Chip color="primary">{order.createdAt.slice(0, 10)}</Chip> */}
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
    </div>
  );
}

export default OrderCardDetail;
