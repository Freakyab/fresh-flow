import React, { ReactNode } from "react";
import { Divider } from "@nextui-org/react";
type TitleProps = {
  title: string;
  Icon: ReactNode;
  className?: string;
};
const Title = ({ title, Icon, className }: TitleProps) => {
  return (
    <div className="flex w-full justify-between">
      <div className={`${className} px-2 w-fit flex`}>
        <span className="p-1 w-6 h-6 flex justify-center items-center m-1 rounded-2xl bg-light-bg">
          {Icon}
        </span>
        <div>
          <p className="text-xl capitalize tracking-tighter ">{title}</p>
          <Divider className="my-1" />
        </div>
      </div>
      <div className="px-2 w-fit ">
        <p className="capitalize tracking-tighter cursor-pointer ">See more {">>"}</p>
        <Divider className="my-1" />
      </div>
    </div>
  );
};

export default Title;
