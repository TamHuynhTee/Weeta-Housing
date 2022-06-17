import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Prop = {
  className?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  options?: Array<{ label: string; value: any }>;
};

const Select = (props: Prop) => {
  const {
    className = '',
    placeholder = 'Tìm kiếm',
    register,
    options = [],
  } = props;

  return (
    <select
      {...register}
      className={`w-full h-full bg-inherit min-h-[48px] border border-solid rounded-[3px] outline-none px-[10px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] hover:border-[rgb(0_132_137)] ${className}`}
      placeholder={placeholder}
    >
      {options.map((item, index) => (
        <option value={item.value} key={index}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
