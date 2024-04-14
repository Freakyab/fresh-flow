'use client';
import React from "react";
import { warehouseOrderType } from "../../../../components/dataSample/orderType";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import warehouseDetailData from "../../../../components/dataSample/warehouseData";
import Title from "@/components/dashboard/profile/title";
import { GoListUnordered } from "react-icons/go";
import { LuWarehouse, LuGanttChartSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { ExpenseChart } from "@/components/dashboard/cartItems/chart";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";

function page() {


  return (
    <div className="gap-3 flex flex-col w-full h-full p-3 ">
      <div className="flex gap-3">
        <div className="bg-white rounded-xl w-fit p-3">
          <Title title="Customer Detail" Icon={<LuWarehouse />} link={'/dashboard/customer/profile'}/>
          <div className="flex gap-3 p-3">
            <Card shadow="sm" className="bg-light-bg ">
              <CardBody className="flex justify-center text-nowrap gap-3">
                <div className="flex gap-2">
                Customer Name :
                  <Chip variant="bordered">{warehouseDetailData[0].name}</Chip>
                </div>
                <div className="flex gap-2">
                Customer Owner :
                  <Chip color="primary">
                    {warehouseDetailData[0].ownerName}
                  </Chip>
                </div>
                <div className="flex gap-2">
                  Username :
                  <Chip color="primary">{warehouseDetailData[0].name}</Chip>
                </div>
                <div className="flex gap-2">
                  City :
                  <Chip color="primary">{warehouseDetailData[0].city}</Chip>
                </div>
                {/* <div className="flex gap-2">
                  Temperature : low :-{" "}
                  <Chip color="primary">
                    {warehouseDetailData[0]}
                  </Chip>
                  high :-{" "}
                  <Chip color="primary">
                    {warehouseDetailData[0].facility.temperature.high}
                  </Chip>
                </div> */}
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="bg-white rounded-xl w-full p-3">
          <Title title="Recent's Order" Icon={<GoListUnordered />} link={'/dashboard/customer/orders'} />
          <div className="flex gap-3 p-3 flex-col lg:flex-row">
            {/* {warehouseOrderType.map((order, index) => (
              <div key={index}>
                <OrderCardDetail {...order} />
                <Divider />
              </div>
            ))} */}
          </div>
        </div>
      </div>
      <div className="flex gap-3 h-full">
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title title="Charts" Icon={<LuGanttChartSquare />} link={'/dashboard/customer/charts'}/>
          <ExpenseChart className=""/>
        </div>
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title title="Settings" Icon={<CiSettings />} link={'/dashboard/customer/settings'}/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          eveniet iste cumque autem, quod veniam molestias placeat commodi enim
          omnis minus possimus nulla non, totam deserunt hic voluptas, repellat
          optio? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus recusandae cum consequatur minima similique aliquam
          laudantium provident iusto laboriosam, delectus molestiae temporibus
          eligendi doloribus mollitia architecto molestias voluptas voluptate
          explicabo quidem maxime cumque dolore dicta aperiam! Facere cupiditate
          debitis illo laudantium nam alias totam quasi adipisci ipsum
          doloribus, accusantium ullam nesciunt sequi velit itaque facilis
          tempora deserunt officiis atque sed. Nihil officiis voluptate,
          repellendus id illo fugiat veniam mollitia quasi a quibusdam, possimus
          modi magnam odio nam. Obcaecati quibusdam accusamus sed, nisi id
          temporibus, incidunt, soluta harum nulla accusantium architecto.
        </div>
      </div>
    </div>
  );
}

export default page;
