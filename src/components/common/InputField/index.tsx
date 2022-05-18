import React from 'react';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormRegisterReturn,
} from 'react-hook-form';
import ErrorText from '../ErrorText';
import InputDate from '../InputDate';
import InputMoney from '../InputMoney';
import InputNumber from '../InputNumber';

type Props = {
  // Common
  register: UseFormRegisterReturn;
  name: string;
  inputClassName?: string;
  overrideInputClassName?: boolean;
  errors?: any;
  label?: string;
  type?: 'password' | 'text' | 'email' | 'number' | 'date' | 'money';
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  setValue?: (key: string, value: unknown) => void;
  showLabel?: boolean;
  isRequired?: boolean;
  //   Date
  maxDate?: string;
  minDate?: string;
  //   Number
  maxNumber?: number;
  minNumber?: number;
  allowNegative?: boolean;
  //   Money
  clearErrors?: UseFormClearErrors<FieldValues>;
};

const InputField = ({
  register,
  name,
  type = 'text',
  inputClassName = '',
  overrideInputClassName = false,
  errors = {},
  label = '[Tên gì đó cho ô nhập ...]',
  placeholder = '',
  defaultValue = '',
  allowNegative = false,
  disabled = false,
  onChange = () => {
    return;
  },
  setValue = () => {
    return;
  },
  clearErrors = () => {
    return;
  },
  showLabel = true,
  isRequired = false,
  maxDate = '',
  minDate = '',
}: Props) => {
  const [thisType, setThisType] = React.useState(type);
  const [showVisible, setShowVisible] = React.useState(false);

  const changeType = () =>
    setThisType(thisType === 'password' ? 'text' : 'password');

  React.useEffect(() => {
    if (type === 'password') {
      setShowVisible(true);
    }
  }, [type]);

  return (
    <>
      {showLabel && (
        <label htmlFor={name} className="block font-semibold mb-[10px]">
          {label} {isRequired && <span className="text-red-400">(*)</span>}
        </label>
      )}
      {thisType === 'number' ? (
        <InputNumber
          name={name}
          registerForm={register}
          placeholder={placeholder}
          className={inputClassName}
          defaultValue={defaultValue}
          allowNegative={allowNegative}
          onChange={onChange}
          setValue={setValue}
          errors={errors}
          overrideInputClassName={overrideInputClassName}
          id={name}
          disabled={disabled}
        />
      ) : thisType === 'date' ? (
        <InputDate
          name={name}
          registerForm={register}
          className={inputClassName}
          defaultValue={defaultValue}
          errors={errors}
          overrideInputClassName={overrideInputClassName}
          id={name}
          disabled={disabled}
          min={minDate}
          max={maxDate}
        />
      ) : thisType === 'money' ? (
        <InputMoney
          name={name}
          register={register}
          inputClassName={inputClassName}
          defaultValue={defaultValue}
          placeholder={placeholder}
          errors={errors}
          overrideInputClassName={overrideInputClassName}
          id={name}
          disabled={disabled}
          setValue={setValue}
          clearError={clearErrors}
        />
      ) : (
        <div className="relative bg-white">
          <input
            disabled={disabled}
            type={thisType}
            {...register}
            name={name}
            id={name}
            className={
              overrideInputClassName
                ? inputClassName
                : `w-full bg-inherit border border-solid rounded-[3px] outline-none pl-[18px] pr-[18px] ${
                    type === 'password' && 'pr-[35px]'
                  } py-[4px] min-h-[48px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] border-[rgb(230_230_230)] ${
                    errors[name] && '!border-[rgb(249_80_61)]'
                  } ${inputClassName}`
            }
            placeholder={placeholder}
          />
          {showVisible && (
            <span
              className="cursor-pointer block w-[20px] h-[20px] absolute right-[10px] top-[50%] translate-y-[-50%]"
              onClick={changeType}
            >
              <img
                src={`/icons/ic_eye${
                  thisType !== 'password' ? '_close' : ''
                }.png`}
                className="w-full h-full"
                alt=""
              />
            </span>
          )}
        </div>
      )}
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  );
};

export default InputField;
