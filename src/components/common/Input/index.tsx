import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Prop = {
  className?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
};

const Input = (props: Prop) => {
  const { className = '', placeholder = 'Tìm kiếm', register } = props;

  return (
    <input
      {...register}
      className={`w-full h-full bg-inherit border border-solid rounded-[3px] outline-none pl-[10px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] hover:border-[rgb(0_132_137)] pr-[30px] ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
