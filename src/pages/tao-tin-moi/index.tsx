import Breadcrumb from '@/components/common/BreadCrumb';
import GoogleMap from '@/components/common/GoogleMap';
import InputField from '@/components/common/InputField';
import LineHorizontal from '@/components/common/LineHorizontal';
import SelectBoxField from '@/components/common/SelectBoxField';
import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxSelectLocation from '@/components/pages/tao-tin-moi/BoxSelectLocation';
import FacilitiesForm from '@/components/pages/tao-tin-moi/FacilitiesForm';
import VideoPicker from '@/components/pages/tao-tin-moi/VideoPicker';
import { DISTRICTS, WARDS } from '@/constants/location.constants';
import {
  formatMoney,
  getIndexOfTrueItems,
  moneyConverter,
} from '@/helpers/base.helpers';
import { notifyError } from '@/helpers/toast.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { batch } from 'react-sweet-state';
import * as yup from 'yup';
import ImagePicker from '../../components/pages/tao-tin-moi/ImagePicker';

const CkEditorField = dynamic(
  () => import('@/components/common/CkEditorField'),
  {
    ssr: false,
  }
);

const schema = yup.object().shape({
  title: yup.string().required('Chưa nhập tiêu đề bài viết'),
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
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const preMoney = watch('price') || 0;

  const handleCreateArticle = async (data: any) => {
    const { number, street, area, price, files, video, facilities, ...rest } =
      data;

    const listFiles = Object.values(files);
    if (listFiles.length < 1) {
      notifyError('Vui lòng đăng tải ít nhất 1 hình ảnh');
      return;
    }

    if (video) listFiles.push(video);

    const places_around = getIndexOfTrueItems(
      Object.values(facilities.places_around)
    );
    const typeUser = getIndexOfTrueItems(Object.values(facilities.typeUser));

    const payload = {
      ...rest,
      location: {
        latitude: 1,
        longitude: 1,
      },
      street: `${number} ${street}`,
      area: +area,
      price: moneyConverter(price),
      files: listFiles,
      facilities: {
        ...facilities,
        places_around,
        typeUser,
        electric: {
          price: moneyConverter(facilities.electric.price),
          unit: facilities.electric.unit,
        },
        water: {
          price: moneyConverter(facilities.water.price),
          unit: facilities.water.unit,
        },
        wifi: {
          price: moneyConverter(facilities.wifi.price),
          unit: facilities.wifi.unit,
        },
      },
    };
    // console.log('payload', payload);
    const result = await actionArticle.createArticleAsync(payload);
    if (result.success) {
      router.push(`/tao-tin-moi/chon-goi-dang-tin/${result.data?._id}`);
    }
  };

  const handleSelectDistrict = (item: { label: string; value: string }) => {
    batch(() => {
      setDistrict(item.label);
      setValue('district', item.value);
      setValue('ward', '');
      setSelectedDistrict(+item.value);
      setWard('Chọn phường, xã');
      clearErrors('district');
    });
  };

  const handleSelectWard = (item: { label: string; value: string }) => {
    batch(() => {
      setValue('ward', item.value);
      setWard(item.label);
      clearErrors('ward');
    });
  };

  return (
    <React.Fragment>
      <LayoutCommon title="Tạo tin" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { href: '/', value: 'Weeta' },
              { href: '/tao-tin-moi', value: 'Tạo tin mới' },
            ]}
            classNameContainer="mb-[20px]"
          />
          {/* title page */}
          <div className="h-[50px] bg-baseColor rounded-[3px] flex justify-center">
            <p className="text-[24px] text-white font-bold self-center">
              Đăng tin phòng trọ mới ở TP Hồ Chí Minh
            </p>
          </div>
          {/* form */}
          <div className="mt-[20px] py-[20px] px-[60px] border border-[#d8d7d7] bg-white rounded-[3px] hover:shadow">
            <form
              className="w-full"
              onSubmit={handleSubmit(handleCreateArticle)}
            >
              <div className="grid grid-cols-4">
                <div className="col-span-2 pr-[20px] border-r md:border-0 md:col-span-4 md:p-0">
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
                </div>
                <div className="col-span-2 pl-[20px] md:mt-[20px] md:col-span-4 md:h-[400px] md:p-0">
                  <div className="w-full h-full flex flex-col">
                    <p className="text-[20px] font-semibold text-baseColor text-center">
                      Bản đồ
                    </p>
                    <div className="flex-1 w-full mt-[20px]">
                      <GoogleMap />
                    </div>
                  </div>
                </div>
              </div>
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Mặt bằng và giá cả
              </p>
              <div className="mt-[20px] grid grid-cols-2 gap-x-[10px]">
                <div className="col-span-1">
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
                <div className="col-span-1">
                  <InputField
                    type="money"
                    register={register('price')}
                    name="price"
                    label="Giá tiền (mỗi tháng) VND"
                    placeholder="Giá cho thuê"
                    setValue={setValue}
                    clearErrors={clearErrors}
                    errors={errors}
                    isRequired
                  />
                </div>
              </div>
              <div className="mt-[20px]">
                <p className="block font-semibold text-baseColor mb-[10px]">
                  Tạm tính
                </p>
                <div className="bg-green-200 px-[20px] py-[10px] rounded-[3px]">
                  {formatMoney(+preMoney)} VND/tháng
                </div>
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
                <CkEditorField
                  name="description"
                  setValue={setValue}
                  defaultValue={''}
                  label={'Mô tả'}
                />
              </div>
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Tiện ích
              </p>
              <div className="mt-[20px]">
                <FacilitiesForm
                  register={register}
                  setValue={setValue}
                  clearErrors={clearErrors}
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
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Video giới thiệu
              </p>
              <div className="mt-[20px]">
                <p className="">Tải video giới thiệu ở đây (tối đa 1 video)</p>
                <VideoPicker setValue={setValue} name="video" />
              </div>
              <LineHorizontal className="my-[30px]" />
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

export default Authentication(CreatePostPage, { requiredLogin: true });
