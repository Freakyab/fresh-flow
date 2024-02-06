import { ReactNode } from "react";

type Option = {
  label: string;
  icon: ReactNode;
  value: string;
  key: string;
};

type orderProps = {
  key: number;
  name: string;
  type: string;
  quantity: number;
  status: string;
  duration: number;
};

const ProfileField = ({ key, icon, label, value }: Option) => (
  <div className="flex p-2" key={key}>
    <span className="px-2 justify-start mt-2">{icon}</span>
    <span className="flex flex-col">
      <span className="text-xl font-semibold capitalize">{label}</span>
      <span className="text-xs text-blue-700">{value}</span>
    </span>
  </div>
);

export const OrderField = ({
  key,
  name,
  type,
  quantity,
  status,
  duration,
}: orderProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex m-2 bg-gray-100 p-2 shadow-xl rounded-lg" key={key}>
        <span className="p-2">
          <p className="font-semibold px-2">{name}</p>
          <p className="font-light px-2">
            type : <span className="font-medium">{type}</span>
          </p>
        </span>
        <span className="p-2">
          <p className="font-semibold px-2">Quantity</p>
          <p className="font-medium px-2">{quantity}</p>
        </span>
        <span className="p-2">
          <p className="font-semibold px-2">Status</p>
          <p
            className={`font-bold ${
              status === "Requested"
                ? "text-blue-700"
                : status === "Reject"
                ? "text-red-700"
                : "text-green-700"
            } px-2`}>
            {status}
          </p>
        </span>
        <span className="p-2">
          <p className="font-semibold px-2">Duration</p>
          <p className="font-medium px-2">
            {duration} {"("}in month{")"}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ProfileField;
