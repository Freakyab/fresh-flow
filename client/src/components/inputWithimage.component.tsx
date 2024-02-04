// 'use client';
import React, { useState } from "react";
import { ReactNode } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type InputWithImageProps = {
  Image: ReactNode;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithImageComponent = ({
  Image,
  placeholder,
  type,
  value,
  onChange,
}: InputWithImageProps) => {

    const [typeCast, setTypeCast] = useState("password");
  return (
    <span className="flex justify-between items-center">
      <label className="text-blue-500 bg-black h-12 w-[60px] justify-center items-center flex p-2">
        {Image}
      </label>
      <div className="relative w-full">
        <input
          type={type === "password" ? typeCast : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-12 px-4 border border-gray-300 rounded-r-md focus:outline-none"
        />
        {type === "password" && (
          <span className="text-gray-500 absolute cursor-pointer top-4 right-0 pr-4"
            onClick={() => setTypeCast(typeCast === "password" ? "text" : "password")}>
                {typeCast === "password" ? (
                <FaRegEye size={20} />
                ) : (
                <FaRegEyeSlash size={20} />
                )}  
            </span>
         
        )}
      </div>
    </span>
  );
};

export default InputWithImageComponent;
