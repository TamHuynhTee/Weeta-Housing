import Breadcrumb from '@/components/common/BreadCrumb';
import ContainerModal from '@/components/common/ContainerModal';
import GoogleMap from '@/components/common/GoogleMap';
import InputField from '@/components/common/InputField';
import LineHorizontal from '@/components/common/LineHorizontal';
import SelectBoxField from '@/components/common/SelectBoxField';
import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxSelectLocation from '@/components/pages/tao-tin-moi/BoxSelectLocation';
import ModalConfirmDeleteArticle from '@/components/pages/tao-tin-moi/ModalConfirmDeleteArticle';
import VideoPicker from '@/components/pages/tao-tin-moi/VideoPicker';
import { DISTRICTS, WARDS } from '@/constants/location.constants';
import {
  detectMediaString,
  formatMoney,
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
  title: yup.string().required('Chưa nhập tiêu đề bài đăng'),
  district: yup.string().required('Chưa chọn quận, huyện'),
  ward: yup.string().required('Chưa chọn phường, xã'),
  street: yup.string().required('Chưa nhập địa chỉ'),
  price: yup.string().required('Chưa nhập giá cho thuê'),
  area: yup.string().required('Chưa nhập diện tích cho thuê'),
  description: yup.string(),
  //   files: yup.mixed().required('Chưa chọn ảnh chụp'),
});

const UpdatePostPage = () => {
  const [stateArticle, actionArticle] = useArticle();
  const [selectedDistrict, setSelectedDistrict] = React.useState<
    number | undefined
  >(undefined);

  const [district, setDistrict] = React.useState('Chọn quận, huyện');
  const [ward, setWard] = React.useState('Chọn phường, xã');

  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const preMoney = watch('price') || 0;

  const router = useRouter();
  const articleId = router.query.article as string;
  const data = stateArticle.articleDetail;
  const backURL = router.query.backURL as string;

  const images = data?.image?.filter(
    (item) => detectMediaString(item) === 'image'
  );

  const video = data?.image?.filter(
    (item) => detectMediaString(item) === 'video'
  )[0];

  React.useEffect(() => {
    if (!stateArticle.articleDetail)
      if (articleId) actionArticle.getDetailArticleAsync(articleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, stateArticle.articleDetail]);

  React.useEffect(() => {
    return () => {
      if (stateArticle.articleDetail) actionArticle.setDetailArticle(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (data) {
      batch(() => {
        setValue('district', data.district);
        setDistrict(
          DISTRICTS.find((item) => item.value === data.district)?.label || ''
        );
        setSelectedDistrict(data.district);
        setWard(
          WARDS(data.district).find((item) => item.value === data.ward)
            ?.label || ''
        );
        setValue('ward', data.ward);
        setValue('street', data.street);
        setValue('area', data.area);
        setValue('price', formatMoney(data.price));
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('image', data.image);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleUpdateArticle = async (formData: any) => {
    if (data) {
      const { area, price, files, image, ...rest } = formData;
      const listFiles = Object.values(files);
      if (listFiles.length + image.length < 1) {
        notifyError('Vui lòng đăng tải ít nhất 1 hình ảnh');
        return;
      }

      const payload = {
        ...rest,
        location: {
          latitude: 1,
          longtitude: 1,
        },
        area: +area,
        price: moneyConverter(price),
        files: listFiles,
        image: image,
      };
      //   console.log('payload', payload);
      const result = await actionArticle.updateArticleAsync(data._id, payload);
      if (result.success) {
        router.push(backURL || '/');
      }
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
      <LayoutCommon title="Chỉnh sửa tin" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { href: '/', value: 'Weeta' },
              { href: '/tao-tin-moi', value: 'Chỉnh sửa' },
            ]}
            classNameContainer="mb-[20px]"
          />
          {/* title page */}
          <div className="h-[50px] bg-orange-400 rounded-[3px] flex justify-center">
            <p className="text-[24px] text-white font-bold self-center">
              Chỉnh sửa thông tin phòng trọ
            </p>
          </div>
          {/* form */}
          <div className="mt-[20px] py-[20px] px-[60px] border border-[#d8d7d7] bg-white rounded-[3px] hover:shadow">
            <form
              className="w-full"
              onSubmit={handleSubmit(handleUpdateArticle)}
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
              <div className="mt-[20px]">
                <p className="block font-semibold text-baseColor mb-[10px]">
                  Tạm tính
                </p>
                <div className="bg-green-200 px-[20px] py-[10px] rounded-[3px]">
                  {typeof preMoney === 'number'
                    ? formatMoney(preMoney)
                    : preMoney.includes('.')
                    ? preMoney
                    : formatMoney(+preMoney)}{' '}
                  VND/tháng
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
                  defaultValue={data?.description}
                  label={'Mô tả'}
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
                  listImages={images}
                />
              </div>
              <LineHorizontal className="my-[30px]" />
              <p className="text-[20px] font-semibold text-baseColor text-center">
                Video giới thiệu
              </p>
              <div className="mt-[20px]">
                <p className="">Tải video giới thiệu ở đây (tối đa 1 video)</p>
                <VideoPicker setValue={setValue} video={video} name="video" />
              </div>
              <LineHorizontal className="my-[30px]" />
              <div className="mt-[30px] flex gap-x-[20px]">
                <input
                  type="submit"
                  className="button-primary w-[128px] h-[40px]"
                  value={'Cập nhật'}
                />
                <button
                  type="button"
                  className="button-outline-primary-red w-[128px] h-[40px]"
                  onClick={openDeleteModal}
                >
                  Xóa
                </button>
              </div>
            </form>
          </div>
          {/* Modal */}
          <ContainerModal isVisible={deleteModal} closeModal={closeDeleteModal}>
            <ModalConfirmDeleteArticle closeModal={closeDeleteModal} />
          </ContainerModal>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(UpdatePostPage, { requiredLogin: true });
