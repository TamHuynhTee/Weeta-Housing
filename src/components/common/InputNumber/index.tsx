import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  disable?: boolean;
  registerForm?: UseFormRegisterReturn;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowNegative?: boolean;
  setValue?: (key: string, value: unknown) => void;
  errors?: any;
  overrideInputClassName?: boolean;
  id?: string;
}

const InputNumber = (props: Props) => {
  const {
    name,
    placeholder = '',
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
    overrideInputClassName = false,
    errors = {},
    id = '',
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
      id={id}
      onChange={(e) => {
        handleAllowNegative(allowNegative, e);
        onChange(e);
      }}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onWheel={(e) => e.currentTarget.blur()}
      onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
      className={
        overrideInputClassName
          ? className
          : `w-full bg-inherit border border-solid rounded-[3px] outline-none pl-[11px] pr-[11px] py-[4px] min-h-[48px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] border-[rgb(230_230_230)] ${
              errors[name] && '!border-[rgb(249_80_61)]'
            } ${className}`
      }
    />
  );
};

export default InputNumber;
