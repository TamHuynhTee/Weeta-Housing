import LayoutCommon from '@/components/layout/LayoutCommon';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

// const schema = yup.object().shape({
//   title: yup.string().required('Chưa nhập tiêu đề bài đăng'),
// });

const ChoosePostPackagePage = () => {
  //   const [, actionArticle] = useArticle();
  //   const [selectedDistrict, setSelectedDistrict] = React.useState<
  //     number | undefined
  //   >(undefined);
  //   const [district, setDistrict] = React.useState('Chọn quận, huyện');
  //   const [ward, setWard] = React.useState('Chọn phường, xã');
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     setValue,
  //   } = useForm({ resolver: yupResolver(schema) });

  //   const handleCreateArticle = async (data: any) => {
  //     const { district, ward, street, number, area, price, ...rest } = data;
  //     const payload = {
  //       ...rest,
  //       address: `${number}, ${street}, ${ward}, ${district}, TPHCM`,
  //       location: {
  //         latitude: 1,
  //         longtitude: 1,
  //       },
  //       area: +area,
  //       price: +price,
  //     };
  //     const result = await actionArticle.createArticleAsync(payload);
  //     // console.log(`result`, result);
  //     if (result) {
  //     }
  //   };
  return (
    <React.Fragment>
      <LayoutCommon title="Tạo tin" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <div className="h-[50px] bg-baseColor rounded-[3px] flex justify-center">
            <p className="text-[24px] text-white font-bold self-center">
              Chọn gói đăng tin
            </p>
          </div>
          <div className="mt-[20px] py-[20px] px-[60px] border border-[#d8d7d7] bg-white rounded-[3px] hover:shadow">
            <form
              className="w-full"
              //   onSubmit={handleSubmit(handleCreateArticle)}
            >
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

export default Authentication(ChoosePostPackagePage, { requiredLogin: true });
