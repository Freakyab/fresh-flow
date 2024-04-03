import React from "react";
import { warehouseOrderType } from "../../../../components/dataSample/orderType";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import warehouseDetailData from "../../../../components/dataSample/warehouseData";
import Title from "@/components/dashboard/profile/title";
import { GoListUnordered } from "react-icons/go";
import { LuWarehouse, LuGanttChartSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

function page() {
  return (
    <div className="gap-3 flex flex-col w-full h-full p-3 ">
      <div className="flex gap-3">
        <div className="bg-white rounded-xl w-fit p-3">
          <Title title="Warehouse Detail" Icon={<LuWarehouse />} />
          <div className="flex gap-3 p-3">
            <Card shadow="sm" className="bg-light-bg ">
              <CardBody className="flex justify-center text-nowrap gap-3">
                <div className="flex gap-2">
                  Warehouse Name :
                  <Chip variant="bordered">{warehouseDetailData[0].name}</Chip>
                </div>
                <div className="flex gap-2">
                  Warehouse Owner :
                  <Chip color="primary">
                    {warehouseDetailData[0].ownerName}
                  </Chip>
                </div>
                <div className="flex gap-2">
                  Username :
                  <Chip color="primary">{warehouseDetailData[0].username}</Chip>
                </div>
                <div className="flex gap-2">
                  City :
                  <Chip color="primary">{warehouseDetailData[0].city}</Chip>
                </div>
                <div className="flex gap-2">
                  Temperature : low :-{" "}
                  <Chip color="primary">
                    {warehouseDetailData[0].facility.temperature.low}
                  </Chip>
                  high :-{" "}
                  <Chip color="primary">
                    {warehouseDetailData[0].facility.temperature.high}
                  </Chip>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="bg-white rounded-xl w-full p-3">
          <Title title="Recent's Order" Icon={<GoListUnordered />} />
          <div className="flex gap-3 p-3 flex-col lg:flex-row">
            {warehouseOrderType.map((order, index) => (
              <Card shadow="sm" key={index} className="bg-light-bg">
                <CardBody className="flex justify-center text-nowrap gap-3">
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
      </div>
      <div className="flex gap-3 h-full">
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title title="Charts" Icon={<LuGanttChartSquare />} />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque neque
          incidunt nisi, ea corrupti soluta dolore tenetur odit quibusdam,
          laboriosam magnam molestias officia necessitatibus placeat distinctio
          ut minima molestiae, quod cupiditate eum. Officiis, reprehenderit?
          Quos ea aut voluptatem, quaerat recusandae eum adipisci dolores
          repellat. Ipsa porro aspernatur at et dolorem odit in sunt quas quo
          accusantium cupiditate asperiores deserunt recusandae quis laborum
          eius voluptates, harum id architecto nostrum non? Harum blanditiis est
          libero, minima saepe fuga cumque molestias. Cum necessitatibus
          repellat eum dicta aut magnam facilis cupiditate consequuntur
          voluptatem eius libero expedita velit explicabo nostrum quos,
          provident, quidem nisi aperiam soluta illum consectetur! Corporis
          optio placeat dolore nulla qui nisi soluta ex inventore molestias
          animi quasi sint eligendi
        </div>
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title title="Settings" Icon={<CiSettings />} />
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
