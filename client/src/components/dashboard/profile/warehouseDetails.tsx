import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

function WarehouseDetails({
  warehouseDetailData,
  className,
}: {
  warehouseDetailData: warehouseDetailDataProps;
  className: string;
}) {
  return (
    <div className={className}>
      <Card className="border-none mb-3 bg-light-bg">
        <CardHeader className="bg-white text-black text-lg font-semibold">
          Warehouse Details
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Owner name: </p>
              <p>{warehouseDetailData.ownerName}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Total Capacity (in MT): </p>
              <p>{warehouseDetailData.capacity}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Type of Storage: </p>
              <p>{warehouseDetailData.type}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Status: </p>
              <p>{warehouseDetailData.status}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Types of crops: </p>
              <p>
                {warehouseDetailData.typeOfCrop?.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index === warehouseDetailData.typeOfCrop.length - 1
                      ? ""
                      : ", "}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Email: </p>
              <p>{warehouseDetailData.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Phone no: </p>
              <p>{warehouseDetailData.phoneNo}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Registration Date: </p>
              <p>{warehouseDetailData.registrationDate}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">
                Registration Valid-Upto:{" "}
              </p>
              <p>{warehouseDetailData.registrationValidUpto}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Location: </p>
              <p>
                Lat:{" "}
                {warehouseDetailData.location &&
                  warehouseDetailData.location[0]}
                , Lng:{" "}
                {warehouseDetailData.location &&
                  warehouseDetailData.location[1]}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">Warehouse address: </p>
              <p>{warehouseDetailData.address}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">City: </p>
              <p>{warehouseDetailData.city}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
              <p className="text-lg font-semibold">State: </p>
              <p>{warehouseDetailData.state}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default WarehouseDetails;
