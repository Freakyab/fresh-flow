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
        id={value}
        className="hidden"
        name={name}
        value={value}
        onChange={handleUserTypeChange}
      />
      <label htmlFor={value} className="flex w-full justify-between items-center">
        <span className="text-blue-500 bg-black h-16 w-16 justify-center items-center flex p-2">
          {Image}
        </span>
        <span className="w-[300px] text-center py-4 h-16  text-xl border border-gray-300 rounded-r-md">
          {value}
        </span>
      </label>
    </div>
  );
};

export default InputRadioWithImageComponent;
