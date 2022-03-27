import React from 'react';
import { formatMoney } from '../../../helpers/base.helpers';

interface Props {
  name: string;
  placeholder: string;
  className?: string;
  disable?: boolean;
  //   registerForm?: UseFormRegisterReturn;
  defaultValue?: number | string;
  setValue: (key: string, value: unknown) => void;
  clearError: (key: string) => void;
}

const InputMoney = (props: Props) => {
  const {
    name,
    placeholder,
    className = '',
    // registerForm = {},
    disable = false,
    defaultValue = '',
    setValue,
    clearError,
  } = props;
  const refInput = React.useRef<HTMLInputElement>(null);

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
    if (refInput.current) {
      refInput.current.value = formatMoney(+value);
    }
  };
  return (
    <input
      name={name}
      //   {...registerForm}
      ref={refInput}
      disabled={disable}
      type="text"
      onChange={onChange}
      min={0}
      onKeyDown={checkCharacter}
      placeholder={placeholder}
      className={`w-full pl-[16px] py-[8px] border outline-none border-gray-200 rounded-[10px] text-16px font-normal focus:border-green-600 ${className}`}
    />
  );
};

export default InputMoney;
