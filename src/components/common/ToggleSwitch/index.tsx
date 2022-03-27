import React, { ReactChild } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './style.module.css';
interface Props {
  labelText?: string | ReactChild;
  idToggleSw: string;
  registerForm?: UseFormRegisterReturn;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  allowLabelClick?: boolean;
}

const ToggleSwitch = (props: Props) => {
  const {
    labelText = '',
    idToggleSw,
    registerForm = {},
    defaultChecked = false,
    onChange,
    disabled = false,
    allowLabelClick = true,
  } = props;
  return (
    <div>
      <div
        className={`
    relative
    inline-block
    w-[36px]
    mr-2
    align-middle
    select-none
    transition
    duration-200
    ease-in
    ${disabled ? 'opacity-5' : ''}
    `}
      >
        <input
          {...registerForm}
          type="checkbox"
          name={idToggleSw}
          id={idToggleSw}
          disabled={disabled}
          defaultChecked={defaultChecked}
          onChange={
            onChange ||
            (() => {
              return;
            })
          }
          className={`${styles.toggleCheckbox}
          absolute
          left-[4px]
          top-[50%]
          translate-y-[-50%]
          block
          w-[14.4px]
          h-[14.4px]
          rounded-full
          bg-[rgb(0_132_137)]
          border-[1px]
          border-[rgb(0_132_137)]
          appearance-none
          cursor-pointer
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
        />
        <label
          htmlFor={idToggleSw}
          className={`
      toggle-label
      block
      overflow-hidden
      h-[20px]
      width-[36px]
      rounded-full
      bg-gray-200
      cursor-pointer
      ${disabled ? 'cursor-not-allowed' : ''}
      `}
        ></label>
      </div>
      {labelText && (
        <label
          htmlFor={allowLabelClick ? idToggleSw : ''}
          className={`text-caption-1 font-bold select-none ${
            allowLabelClick ? `cursor-pointer` : ''
          } text-gray-700`}
        >
          {labelText}
        </label>
      )}
    </div>
  );
};

export default ToggleSwitch;
