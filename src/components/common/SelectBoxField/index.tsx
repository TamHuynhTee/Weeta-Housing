import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorText from '../ErrorText';
import SelectBox from '../SelectBox';

interface Prop {
  classNameContainer?: string;
  overrideClassNameContainer?: boolean;
  label?: string;
  classNameLabel?: string;
  overrideClassNameLabel?: boolean;
  classNameContainerSelectBox?: string;
  overrideClassNameContainerSelectBox?: boolean;
  classNameSelectBox?: string;
  overrideClassNameSelectBox?: boolean;
  id?: string;
  state: string;
  registerForm?: UseFormRegisterReturn;
  children: any;
  errors?: any;
  showChildren?: boolean;
  onSelectClick?: () => void;
  name: string;
  iconPlaceholder?: string;
  showLabel?: boolean;
  isRequired?: boolean;
}

const defaultClass = {
  classNameContainer: 'mt-[24px]',
  classNameLabel:
    'text-[16px] text-black leading-[24px] font-semibold mb-[16px]',
  classNameContainerSelectBox: 'w-full',
  classNameSelectBox: '',
};

const GetClass = (
  override: boolean,
  defaultClass: string,
  applyClass: string
) => {
  return override ? applyClass : defaultClass + ' ' + applyClass;
};

const SelectBoxField = (props: Prop) => {
  const {
    classNameContainer = '',
    overrideClassNameContainer = false,
    label = '',
    classNameLabel = '',
    overrideClassNameLabel = false,
    classNameContainerSelectBox = '',
    overrideClassNameContainerSelectBox = false,
    classNameSelectBox = '',
    overrideClassNameSelectBox = false,
    id = '',
    state = '',
    iconPlaceholder = '',
    registerForm = {} as UseFormRegisterReturn,
    children,
    errors = {},
    showChildren = true,
    onSelectClick,
    name,
    showLabel = true,
    isRequired = false,
  } = props;

  const classContainer = GetClass(
    overrideClassNameContainer,
    defaultClass.classNameContainer,
    classNameContainer
  );
  const classLabel = GetClass(
    overrideClassNameLabel,
    defaultClass.classNameLabel,
    classNameLabel
  );
  const classContainerSelectBox = GetClass(
    overrideClassNameContainerSelectBox,
    defaultClass.classNameContainerSelectBox,
    classNameContainerSelectBox
  );
  const classSelectBox = GetClass(
    overrideClassNameSelectBox,
    defaultClass.classNameSelectBox,
    classNameSelectBox
  );

  return (
    <div className={classContainer}>
      {showLabel && (
        <p className={classLabel}>
          {label} {isRequired && <span className="text-red-400">(*)</span>}
        </p>
      )}
      <div className={classContainerSelectBox}>
        <SelectBox
          idCheckBox={id}
          state={state}
          className={classSelectBox}
          registerForm={registerForm}
          showChildren={showChildren}
          onSelectClick={onSelectClick}
          errors={errors}
          name={name}
          iconPlaceholder={iconPlaceholder}
        >
          {children}
        </SelectBox>
        {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
      </div>
    </div>
  );
};

export default SelectBoxField;
