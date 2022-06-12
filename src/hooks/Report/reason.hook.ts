import React from 'react';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { batch } from 'react-sweet-state';

const useSelectReason = ({
  setValue,
  clearErrors,
}: {
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}) => {
  const [selectedReason, setSelectedReason] = React.useState({
    label: 'Chọn một lý do báo cáo',
    value: '',
  });

  const handleSelectReason = (item: { label: string; value: string }) => {
    batch(() => {
      setSelectedReason(item);
      setValue('reason', item.value);
      clearErrors('reason');
    });
  };

  return {
    // type,
    // setType,
    handleSelectReason,
    selectedReason,
    setSelectedReason,
  };
};

const Hook = { useSelectReason };

export default Hook;
