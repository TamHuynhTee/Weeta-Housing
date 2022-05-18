import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { formatMoney } from '../../../helpers/base.helpers';

interface Props {
  name: string;
  id?: string;
  placeholder?: string;
  inputClassName?: string;
  overrideInputClassName?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  defaultValue?: number | string;
  setValue: (key: string, value: unknown) => void;
  clearError: (key: string) => void;
  errors?: any;
}

const InputMoney = (props: Props) => {
  const {
    name,
    placeholder = '',
    register = {} as UseFormRegisterReturn,
    disabled = false,
    errors = {},
    defaultValue = '',
    inputClassName = '',
    id = '',
    overrideInputClassName = false,
    setValue,
    clearError,
  } = props;
  const refInput = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register;

  React.useEffect(() => {
    if (refInput.current && defaultValue !== '') {
      refInput.current.value = formatMoney(+defaultValue);
    }
  }, [defaultValue]);

  const checkCharacter = (e: React.KeyboardEvent) => {
    if (
      /^Backspace|Tab|ArrowLeft|ArrowUp|ArrowRight|ArrowDown|Enter|Home|End$/.test(
        e.key
      )
    )
      return;
    if (refInput.current) {
      if (refInput.current.value.length <= 15) {
        if (!/([0-9])/.test(e.key)) e.preventDefault();
      } else e.preventDefault();
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.split('.').join('');
    setValue(name, value);
    clearError(name);
    if (refInput.current && refInput.current.value) {
      refInput.current.value = formatMoney(+value);
    }
  };

  return (
    <input
      type="text"
      id={id}
      {...rest}
      ref={(e) => {
        ref(e);
        refInput.current = e;
      }}
      disabled={disabled}
      name={name}
      onChange={onChange}
      onKeyDown={checkCharacter}
      placeholder={placeholder}
      className={
        overrideInputClassName
          ? inputClassName
          : `w-full bg-inherit border border-solid rounded-[3px] outline-none pl-[18px] pr-[18px] py-[4px] min-h-[48px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] border-[rgb(230_230_230)] ${
              errors[name] && '!border-[rgb(249_80_61)]'
            } ${inputClassName}`
      }
    />
  );
};

export default InputMoney;
