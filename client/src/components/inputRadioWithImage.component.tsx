// 'use client';
import React, { ChangeEvent } from "react";
import { ReactNode } from "react";

type InputRadioWithImageComponent = {
  Image: ReactNode;
  handleUserTypeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
};

const InputRadioWithImageComponent = ({
  handleUserTypeChange,
  name,
  value,
  Image,
}: InputRadioWithImageComponent) => {

  return (
    <div className="flex gap-2">
    <input
      type="radio"
      name={name}
      value={value}
      onChange={handleUserTypeChange}
    />
    <span className="flex w-full justify-between items-center">
      <span className="text-blue-500 bg-black h-12 w-16 justify-center items-center flex p-2">
        {Image}
      </span>
      <label className="w-full text-center py-2 h-12 px-4 border border-gray-300 rounded-r-md">
        {value}
      </label>
    </span>
  </div>
  );
};

export default InputRadioWithImageComponent;
