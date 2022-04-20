import Image from 'next/image';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './styles.module.css';

type Props = {
  children: React.ReactElement[] | React.ReactElement;
  state: string;
  className: string;
  idCheckBox: string;
  registerForm?: UseFormRegisterReturn;
  showChildren?: boolean;
  onSelectClick?: () => void;
  clearErrors?: (name: string) => void;
  hasBorder?: boolean;
  errors?: any;
  name: string;
};

const SelectField = (props: Props) => {
  const {
    children,
    state,
    idCheckBox,
    className,
    registerForm = {},
    showChildren = true,
    hasBorder = true,
    onSelectClick = () => {
      return;
    },
    clearErrors,
    errors = {},
    name,
  } = props;

  const classChildren = showChildren ? '' : 'hidden';

  return (
    <div className={`relative`}>
      <label htmlFor={idCheckBox}>
        <div
          onClick={() => {
            onSelectClick();
            clearErrors && clearErrors(idCheckBox);
          }}
          className={`bg-white py-[3px] flex border border${
            hasBorder ? '-gray-200' : '-0'
          } rounded-[3px] items-center cursor-pointer min-h-[38px] ${
            errors[name] && '!border-[rgb(249_80_61)]'
          }`}
        >
          {
            <>
              <input {...registerForm} type="text" defaultValue={''} hidden />
              <span className="px-[18px] appearance-none outline-none select-none text-black text-[16px] font-normal w-full max_line-1 capitalize">
                {state}
              </span>
            </>
          }
          <Image
            src="/icons/ic_dropdown.png"
            alt="icon"
            objectFit="cover"
            width={40}
            height={40}
          />
        </div>
      </label>
      <input
        type="checkbox"
        name="idCheckBox" // KHÔNG THAY ĐỔI NAME Ở ĐÂY !!!
        id={idCheckBox}
        className={styles.selectBox}
        defaultChecked={false}
        hidden
      />
      <label htmlFor={idCheckBox} className="overlayCheckbox"></label>
      <div
        className={`absolute max-h-[0px] border-none transition-all duration-100 bg-transparent overflow-hidden peer-checked:flex flex-col w-full z-10 ${classChildren}`}
      >
        <div className="bg-white rounded shadow border border-grey-200 py-[10px] px-[5px] mt-[10px] relative">
          <div className="right-[20px] absolute top-0 transform -translate-x-1/2 translate-y-[-54%] -rotate-45 w-[10px] h-[10px] bg-white border-r border-t border-grey-200"></div>

          <div
            className={`md:py-[5px] py-[10px] md:px-[5px] px-[10px] relative z-30 ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectField;
