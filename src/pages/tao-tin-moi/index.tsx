import ErrorText from '@/components/common/ErrorText';
import InputField from '@/components/common/InputField';
import LimitedTextArea from '@/components/common/LimitedTextArea';
import LineHorizontal from '@/components/common/LineHorizontal';
import SelectBoxField from '@/components/common/SelectBoxField';
import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxSelectLocation from '@/components/pages/tao-tin-moi/BoxSelectLocation';
import { DISTRICTS, WARDS } from '@/constants/location.constants';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { batch } from 'react-sweet-state';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Chưa nhập tiêu đề bài đăng'),
  district: yup.string().required('Chưa chọn quận, huyện'),
  ward: yup.string().required('Chưa chọn phường, xã'),
  street: yup.string().required('Chưa nhập đường'),
  number: yup.string().required('Chưa nhập số nhà'),
  price: yup.string().required('Chưa nhập giá cho thuê'),
  area: yup.string().required('Chưa nhập diện tích cho thuê'),
  description: yup.string(),
  //   files: yup.mixed().required('Chưa chọn ảnh chụp'),
});

const CreatePostPage = () => {
  const [, actionArticle] = useArticle();
  const [selectedDistrict, setSelectedDistrict] = React.useState<
    number | undefined
  >(undefined);
  const [district, setDistrict] = React.useState('Chọn quận, huyện');
  const [ward, setWard] = React.useState('Chọn phường, xã');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({ resolver: yupResolver(schema) });

  const handleCreateArticle = async (data: any) => {
    const { number, street, area, price, ...rest } = data;
    const payload = {
      ...rest,
      location: {
        latitude: 1,
        longtitude: 1,
      },
      street: `${number} ${street}`,
      area: +area,
      price: +price,
      files: Object.values(rest.files),
    };
    const result = await actionArticle.createArticleAsync(payload);
    if (result) {
      router.push('/thong-tin-ca-nhan/quan-ly-bai-dang/chua-duyet');
    }
  };

  const handleSelectDistrict = (item: { label: string; value: string }) => {
    batch(() => {
      setDistrict(item.label);
      setValue('district', item.label);
      setValue('ward', '');
      setSelectedDistrict(+item.value);
      setWard('Chọn phường, xã');
      clearErrors('district');
    });
  };

  const handleSelectWard = (item: { label: string; value: string }) => {
    batch(() => {
      setValue('ward', item.label);
      setWard(item.label);
      clearErrors('ward');
    });
  };

  return (
    <React.Fragment>
      <LayoutCommon title="Tạo tin" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <div className="h-[50px] bg-baseColor rounded-[3px] flex justify-center">
            <p className="text-[24px] text-white font-bold self-center">
              Đăng tin phòng trọ mới ở TP Hồ Chí Minh
            </p>
          </div>
          <div className="mt-[20px] py-[20px] px-[60px] border border-[#d8d7d7] bg-white rounded-[3px] hover:shadow">
            <form
              className="w-full"
              onSubmit={handleSubmit(handleCreateArticle)}
            >
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Vị trí
              </p>
              <div className="mt-[20px]">
                <SelectBoxField
                  label={'Quận, huyện'}
                  id="district"
                  state={district}
                  registerForm={register('district')}
                  name="district"
                  errors={errors}
                  isRequired
                >
                  <BoxSelectLocation
                    items={DISTRICTS}
                    handleSelectItem={handleSelectDistrict}
                    htmlFor="district"
                  />
                </SelectBoxField>
              </div>
              <div className="mt-[20px]">
                <SelectBoxField
                  label={'Phường, xã'}
                  id="ward"
                  state={ward}
                  registerForm={register('ward')}
                  name="ward"
                  errors={errors}
                  isRequired
                >
                  <BoxSelectLocation
                    items={WARDS(selectedDistrict)}
                    handleSelectItem={handleSelectWard}
                    htmlFor="ward"
                  />
                </SelectBoxField>
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('street')}
                  name="street"
                  label="Đường"
                  placeholder="Vui lòng nhập đúng tên đường"
                  errors={errors}
                  isRequired
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('number')}
                  name="number"
                  label="Số nhà"
                  placeholder="Nhập đúng (số hẻm)/số nhà"
                  errors={errors}
                  isRequired
                />
              </div>
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Mặt bằng và giá cả
              </p>
              <div className="mt-[20px]">
                <InputField
                  type="number"
                  register={register('area')}
                  name="area"
                  label="Diện tích"
                  placeholder="m2"
                  errors={errors}
                  isRequired
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="number"
                  register={register('price')}
                  name="price"
                  label="Giá tiền"
                  placeholder="Giá cho thuê"
                  errors={errors}
                  isRequired
                />
              </div>
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Tiêu đề
              </p>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('title')}
                  name="title"
                  label="Tiêu đề bài viết"
                  placeholder="Tiêu đề"
                  errors={errors}
                  isRequired
                />
              </div>
              <div className="mt-[20px]">
                <label
                  htmlFor="description"
                  className="block font-semibold mb-[10px]"
                >
                  Mô tả
                </label>
                <LimitedTextArea
                  name="description"
                  registerForm={register('description')}
                  limit={1000}
                  value=""
                  placeholder="Giới thiệu chút về chỗ này"
                />
              </div>
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Hình ảnh
              </p>
              <div className="mt-[20px]">
                <p className="">
                  <span className="text-red-400">(*)</span> Bạn vui lòng tải lên
                  ít nhất 1 hình ảnh về phòng trọ bạn cho thuê (tối đa 10 hình)
                </p>
                <ImagePicker
                  register={register('files')}
                  name="files"
                  errors={errors}
                  setValue={setValue}
                />
              </div>
              <input
                type="submit"
                className="button-primary w-32 mt-[30px] h-[40px] md:mt-[20px] md:h-[30px]"
                value={'Tạo'}
                // disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

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
  const handlePickImages = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    const preview = document.querySelector('#images_preview');
    [].forEach.call(files, function (file: any) {
      if (/image\/.*/.test(file.type)) {
        const img = new Image();
        img.style.height = '200px'; // use style, "width" defaults to "auto"
        img.style.width = '200px'; // use style, "width" defaults to "auto"
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        img.style.borderBlockColor = '1px';
        img.src = (URL || webkitURL).createObjectURL(file);
        preview?.appendChild(img); // add image to preview container
      }
    });
    setValue(name, Object.values(files));
  };

  return (
    <>
      <div className="border-dashed h-[200px] mt-[10px] border-gray-300 rounded-[3px] border-2 flex justify-center items-center">
        <label
          className="h-[150px] w-[150px] opacity-30 cursor-pointer"
          htmlFor="article_images"
        >
          <img src="/icons/ic_add.png" alt="" className="w-full h-full" />
        </label>
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
      </div>
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
      <div id="images_preview" className="flex flex-wrap gap-3 mt-[20px]"></div>
    </>
  );
};

export default Authentication(CreatePostPage, { requiredLogin: true });
