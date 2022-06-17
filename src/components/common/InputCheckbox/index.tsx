import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './styles.module.css';

type Props = {
  register: UseFormRegisterReturn;
  name: string;
  label: string | React.ReactChild;
  className?: string;
};

const InputCheckbox = (props: Props) => {
  const { register, name, label, className = '' } = props;
  return (
    <label className={styles.container + ' ' + className}>
      {label}
      <input type="checkbox" {...register} name={name} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default InputCheckbox;
