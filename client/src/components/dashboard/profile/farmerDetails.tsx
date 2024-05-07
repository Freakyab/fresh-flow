import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

function FarmerDetails({
  farmerDetailData,
  className,
}: {
  farmerDetailData: farmerDetailDataProps;
  className: string;
}) {
  return (
    <div className={className}>
      <Card className="border-none mb-3 w-full bg-light-bg">
        <CardHeader className="bg-white text-black text-lg font-semibold">
          Farmer Details
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Farmer name : </p>
              <p>{farmerDetailData.farmerName}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Adhar No : </p>
              <p>{farmerDetailData.adharNo}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Username : </p>
              <p>{farmerDetailData.username}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Email: </p>
              <p>{farmerDetailData.email}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Phone no: </p>
              <p>{farmerDetailData.farmerContact}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Location : </p>
              <p>
                Lat :{" "}
                {farmerDetailData.location && farmerDetailData.location[0]}
                {","} Lng:{" "}
                {farmerDetailData.location && farmerDetailData.location[1]}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">Warehouse address : </p>
              <p>{farmerDetailData.address}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">City : </p>
              <p>{farmerDetailData.city}</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg font-semibold">State : </p>
              <p>{farmerDetailData.state}</p>
            </div>
            <p className="text-lg font-semibold">Crop's Details </p>
            {farmerDetailData.availableCrops?.map((item, index) => (
              <div className="p-1" key={index}>
                <Divider />
                <div className="flex gap-3 items-center">
                  <p className="text-lg font-semibold">Crop : </p>
                  <p>{item.typeOfCrop}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="text-lg font-semibold">Quantity : </p>
                  <p>
                    {item.quantity}
                    {" In quintal"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="text-lg font-semibold">Price : </p>
                  <span>
                    {"₹"}
                    {item.price}
                    <span className="text-sm font-medium">{"/50kg"}</span>
                  </span>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default FarmerDetails;
