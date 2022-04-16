import InputField from '@/components/common/InputField';
import LimitedTextArea from '@/components/common/LimitedTextArea';
import LayoutCommon from '@/components/layout/LayoutCommon';
import { useArticle } from '@/stores/Article';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Chưa nhập tiêu đề bài đăng'),
  district: yup.string().required('Chưa chọn quận, huyện'),
  ward: yup.string().required('Chưa chọn phường, xã'),
  street: yup.string().required('Chưa chọn đường'),
  number: yup.string().required('Chưa nhập số nhà'),
  price: yup.number().required('Chưa nhập giá cho thuê').default(0),
  description: yup.string(),
});

const CreatePostPage = () => {
  const [, actionArticle] = useArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleCreateArticle = async (data: any) => {
    // console.log(data);
    data.location = {
      latitude: 1,
      longtitude: 1,
    };
    const result = await actionArticle.createArticleAsync(data);
    console.log(`result`, result);
    if (result) {
    }
  };

  return (
    <React.Fragment>
      <LayoutCommon title="Tạo tin" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <div className="h-[50px] bg-baseColor rounded-[3px] flex justify-center">
            <p className="text-[24px] text-white font-bold self-center">
              Đăng tin phòng trọ mới
            </p>
          </div>
          <div className="mt-[20px] p-[20px] border border-[#d8d7d7] bg-white rounded-[3px] hover:shadow">
            <form
              className="w-full"
              onSubmit={handleSubmit(handleCreateArticle)}
            >
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('district')}
                  name="district"
                  label="Quận huyện"
                  placeholder=""
                  errors={errors}
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('ward')}
                  name="ward"
                  label="Phường xã"
                  placeholder=""
                  errors={errors}
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('street')}
                  name="street"
                  label="Đường"
                  placeholder=""
                  errors={errors}
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('number')}
                  name="number"
                  label="Số nhà"
                  placeholder=""
                  errors={errors}
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="number"
                  register={register('price')}
                  name="price"
                  label="Giá tiền"
                  placeholder=""
                  errors={errors}
                />
              </div>
              <div className="mt-[20px]">
                <InputField
                  type="text"
                  register={register('title')}
                  name="title"
                  label="Tiêu đề bài viết"
                  placeholder="Tiêu đề"
                  errors={errors}
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
              <input
                type="submit"
                className="button-primary w-32 mt-[30px] h-[40px] md:mt-[20px] md:h-[30px]"
                value="Tạo"
              />
            </form>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default CreatePostPage;
