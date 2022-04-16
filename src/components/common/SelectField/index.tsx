import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorText from '../ErrorText';

type Props = {
  register: UseFormRegisterReturn;
  src: Array<{ label: string; value: any }>;
  name: string;
  inputClassName?: string;
  overrideInputClassName?: boolean;
  errors?: any;
  label?: string;
  placeholder?: string;
};

const SelectField = (props: Props) => {
  const {
    name,
    inputClassName = '',
    overrideInputClassName = false,
    errors = {},
    label = '[Tên gì đó cho ô nhập ...]',
    placeholder = '',
    register,
  } = props;
  return (
    <>
      <label htmlFor="" className="block font-bold mb-[10px]">
        {label}
      </label>
      <select
        {...register}
        name={name}
        placeholder={placeholder}
        className={
          overrideInputClassName
            ? inputClassName
            : `w-full bg-inherit border border-solid rounded-[3px] outline-none pl-[11px] pr-[11px] py-[4px] min-h-[48px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] border-[rgb(230_230_230)] ${
                errors[name] && '!border-[rgb(249_80_61)]'
              } ${inputClassName}`
        }
      ></select>

      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  );
};

export default SelectField;
