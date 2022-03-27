import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorText from '../ErrorText';

type Props = {
  register: UseFormRegisterReturn;
  name: string;
  inputClassName?: string;
  overrideInputClassName?: boolean;
  errors?: any;
  label?: string;
  placeholder?: string;
  type?: 'password' | 'text' | 'email';
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
      <label htmlFor={name} className="block font-bold mb-[10px]">
        {label}
      </label>
      <div className="relative bg-white">
        <input
          type={thisType}
          {...register}
          name={name}
          id={name}
          className={
            overrideInputClassName
              ? inputClassName
              : `w-full bg-inherit border border-solid rounded-[3px] outline-none pl-[11px] pr-[11px] ${
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
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  );
};

export default InputField;
