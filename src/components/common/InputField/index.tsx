import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorText from '../ErrorText';
import InputNumber from '../InputNumber';

type Props = {
  register: UseFormRegisterReturn;
  name: string;
  inputClassName?: string;
  overrideInputClassName?: boolean;
  errors?: any;
  label?: string;
  placeholder?: string;
  type?: 'password' | 'text' | 'email' | 'number';
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowNegative?: boolean;
  disabled?: boolean;
  setValue?: (key: string, value: unknown) => void;
  showLabel?: boolean;
  isRequired?: boolean;
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
  showLabel = true,
  isRequired = false,
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
          disable={disabled}
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
              {thisType === 'password' ? (
                <img src="/icons/ic_eye.png" className="w-full h-full" alt="" />
              ) : (
                <img
                  src="/icons/ic_eye_close.png"
                  className="w-full h-full"
                  alt=""
                />
              )}
            </span>
          )}
        </div>
      )}
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  );
};

export default InputField;
