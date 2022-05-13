import { DEFAULT_DATE_START } from '@/constants/base.constants';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  name: string;
  className?: string;
  disabled?: boolean;
  registerForm?: UseFormRegisterReturn;
  defaultValue?: string | number;
  //   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   setValue?: (key: string, value: unknown) => void;
  errors?: any;
  overrideInputClassName?: boolean;
  id?: string;
  max?: string;
  min?: string;
};

const InputDate = (props: Props) => {
  const {
    name,
    className = '',
    registerForm = {} as UseFormRegisterReturn,
    disabled = false,
    defaultValue = '',
    overrideInputClassName = false,
    errors = {},
    id = '',
    max = '',
    min,
  } = props;

  return (
    <input
      {...registerForm}
      disabled={disabled}
      type="date"
      name={name}
      id={id}
      defaultValue={defaultValue}
      className={
        overrideInputClassName
          ? className
          : `w-full bg-inherit border border-solid rounded-[3px] outline-none pl-[18px] pr-[11px] py-[4px] min-h-[48px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] border-[rgb(230_230_230)] ${
              errors[name] && '!border-[rgb(249_80_61)]'
            } ${className}`
      }
      max={max}
      min={min || DEFAULT_DATE_START}
    />
  );
};

export default InputDate;
