import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  name: string;
  placeholder: string;
  className?: string;
  disable?: boolean;
  registerForm?: UseFormRegisterReturn;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowNegative?: boolean;
  setValue?: (key: string, value: unknown) => void;
}

const InputNumber = (props: Props) => {
  const {
    name,
    placeholder,
    className = '',
    registerForm = {},
    disable = false,
    defaultValue = '',
    allowNegative = false,
    onChange = () => {
      return;
    },
    setValue = () => {
      return;
    },
  } = props;

  const handleAllowNegative = (
    permission: boolean,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!permission) {
      const value = +e.target.value;
      if (value < 0) {
        setValue(name, 1);
      }
    }
  };

  return (
    <input
      {...registerForm}
      disabled={disable}
      type="number"
      name={name}
      onChange={(e) => {
        handleAllowNegative(allowNegative, e);
        onChange(e);
      }}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`w-full pl-[16px] py-[8px] border outline-none border-gray-200 rounded-[10px] text-16px font-normal focus:border-green-600 ${className}`}
    />
  );
};

export default InputNumber;
