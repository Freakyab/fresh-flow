import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

function CustomerDetails({
  customerDetailData,
  className,
}: {
    customerDetailData: customerDetailDataProps;
  className: string;
}) {
  return (
    <div className={className}>
      <Card className="border-none mb-3 w-full bg-light-bg">
        <CardHeader className="bg-white text-black text-lg font-semibold">
          Customer Details
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Customer name : </p>
              <p>{customerDetailData.fullName}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Username : </p>
              <p>{customerDetailData.username}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Email: </p>
              <p>{customerDetailData.email}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Phone no: </p>
              <p>{customerDetailData.phoneNo}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Location : </p>
              <p>
                Lat :{" "}
                {customerDetailData.location && customerDetailData.location[0]}
                {","} Lng:{" "}
                {customerDetailData.location && customerDetailData.location[1]}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Warehouse address : </p>
              <p>{customerDetailData.address}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">City : </p>
              <p>{customerDetailData.city}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">State : </p>
              <p>{customerDetailData.state}</p>
            </div>
            
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CustomerDetails;
