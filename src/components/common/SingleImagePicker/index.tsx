import { notifyError } from '@/helpers/toast.helpers';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

const SingleImagePicker = ({
  name,
  setValue,
}: {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const [image, setImage] = React.useState<File | undefined>(undefined);

  const handlePickImages = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (/image\/.*/.test(file?.type || '')) {
      setImage(file);
      setValue(name, file);
    } else notifyError('Vui lòng chọn đúng định dạng ảnh');
  };

  return (
    <>
      <div className="border-dashed bg-gray-100 w-[300px] h-[300px] mt-[10px] border-gray-300 rounded-[10px] border-2 flex justify-center items-center">
        <label
          className="h-full w-full flex items-center justify-center cursor-pointer active:scale-95"
          htmlFor={name}
        >
          {image ? (
            <img
              src={(URL || webkitURL).createObjectURL(image)}
              alt="add_image"
              className="w-full h-full object-contain rounded-[10px]"
            />
          ) : (
            <img
              src={'/icons/ic_add_image.png'}
              alt="add_image"
              className="w-[50%] h-[50%] object-contain rounded-[10px]"
            />
          )}
        </label>
        <input
          type="file"
          //   {...register}
          name={name}
          id={name}
          hidden
          accept="image/*"
          onChange={handlePickImages}
        />
      </div>
    </>
  );
};

export default SingleImagePicker;
