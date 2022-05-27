import ErrorText from '@/components/common/ErrorText';
import { notifyError } from '@/helpers/toast.helpers';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const ImagePicker = ({
  register,
  errors,
  name,
  setValue,
}: {
  register: UseFormRegisterReturn;
  errors: any;
  name: string;
  setValue: (key: string, value: unknown) => void;
}) => {
  const [images, setImages] = React.useState<Array<any>>([]);
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);

  const handlePickImages = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    if (pickedImages.length + files.length > 10) {
      notifyError('Không được đăng quá 10 ảnh');
      return;
    }
    [].forEach.call(files, function (file: any) {
      if (/image\/.*/.test(file.type)) {
        setPickedImages((images) => [
          ...images,
          (URL || webkitURL).createObjectURL(file),
        ]);
      }
    });
    setImages([...images, ...Object.values(files)]);
    setValue(name, [...images, ...Object.values(files)]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = pickedImages.filter((_, i) => i !== index); // string url, not files
    const newImagesFiles = images.filter((_, i) => i !== index); // these are files
    setPickedImages(newImages);
    setImages(newImagesFiles);
    setValue(name, newImagesFiles);
  };

  return (
    <>
      <div className="border-dashed min-h-[200px] p-5 mt-[10px] border-gray-300 rounded-[3px] border-2 flex justify-center items-center">
        {pickedImages.length > 0 ? (
          <div
            id="images_preview"
            className={`grid grid-cols-5 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2`}
          >
            {pickedImages.map((item, index) => (
              <div
                className="col-span-1 h-[200px] w-full rounded-[10px] border relative"
                key={index}
              >
                <img
                  src={item}
                  alt="images"
                  className="rounded-[10px] h-full w-full object-cover"
                />
                <div
                  className="absolute rounded-[50%] top-[-10px] right-[-10px] h-[30px] w-[30px] bg-red-600 cursor-pointer"
                  onClick={function () {
                    handleRemoveImage(index);
                  }}
                >
                  <img
                    src="/icons/ic_close.png"
                    alt="remove"
                    className="rounded-[50%] h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
            {pickedImages.length < 10 && (
              <label
                className="col-span-1 h-[200px] w-full flex items-center justify-center rounded-[10px] cursor-pointer bg-gray-100 hover:opacity-50 active:scale-95"
                htmlFor="article_images"
              >
                <div className="w-[100px] h-[100px]">
                  <img
                    src="/icons/ic_add_image.png"
                    alt="add_image"
                    className="w-full h-full"
                  />
                </div>
              </label>
            )}
          </div>
        ) : (
          <label
            className="h-[150px] w-[150px] opacity-30 cursor-pointer"
            htmlFor="article_images"
          >
            <img
              src="/icons/ic_add_image.png"
              alt="add_image"
              className="w-full h-full"
            />
          </label>
        )}
      </div>
      <input
        type="file"
        {...register}
        name={name}
        id="article_images"
        hidden
        multiple
        accept="image/*"
        onChange={handlePickImages}
      />
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  );
};

export default ImagePicker;