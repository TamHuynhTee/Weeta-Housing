import Breadcrumb from '@/components/common/BreadCrumb';
import GoogleMap from '@/components/common/GoogleMap';
import LayoutCommon from '@/components/layout/LayoutCommon';
import ImageSlide from '@/components/pages/bai-dang/ImageSlide';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

// const schema = yup.object().shape({
//   title: yup.string().required('Chưa nhập tiêu đề bài đăng'),
// });

const ChoosePostPackagePage = () => {
  const [stateArticle, actionArticle] = useArticle();
  const router = useRouter();
  const articleId = router.query.article as string;
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

  const data = stateArticle.articleDetail;

  return (
    <React.Fragment>
      <LayoutCommon title="Tạo tin" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { href: '/', value: 'Weeta' },
              { href: '/tao-tin-moi', value: 'Tạo tin mới' },
              { href: '#!', value: 'Xem trước và xác nhận' },
            ]}
            classNameContainer="mb-[20px]"
          />
          <div className="h-[50px] bg-orange-100 rounded-[3px] flex justify-center">
            <p className="text-[24px] text-black font-bold self-center">
              Bản xem trước và xác nhận
            </p>
          </div>
          <div className="mt-[20px] py-[20px] px-[60px] border border-[#d8d7d7] bg-white rounded-[3px] hover:shadow">
            <div className="h-[50px] bg-baseColor rounded-[3px] flex justify-center mb-[10px]">
              <p className="text-[24px] text-white font-bold self-center">
                Bản xem trước
              </p>
            </div>
            <div className="grid grid-cols-6 gap-[30px] h-full">
              {/* Preview */}
              <div className="col-span-6 h-full w-full">
                <ImageSlide images={data?.image} />
                <div className="mt-[20px]">
                  <p className="font-bold text-[24px]">{data?.title}</p>
                  <p className="font-semibold text-[24px] mt-[10px]">
                    {data?.address}
                  </p>
                  <p className="text-[36px] font-bold max_line-2 text-baseColor mt-[10px]">
                    {formatMoney(data?.price || 0)}đ
                  </p>
                </div>
                <div className="mt-[20px]">
                  <p className="text-black-100 text-[18px] font-bold">
                    Thông tin chính
                  </p>
                  <ul className="list-disc list-inside mt-[10px] grid grid-cols-2">
                    <li className="col-span-1">
                      Diện tích:{' '}
                      <span className="text-baseColor">
                        {data?.area} m<sup>2</sup>
                      </span>
                    </li>
                    <li className="col-span-1">
                      Ngày đăng:{' '}
                      <span className="text-baseColor">
                        {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                      </span>
                    </li>
                    {/* <li className="col-span-1">
                  Diện tích:{' '}
                  <span className="text-baseColor">{data?.area}</span>
                </li>
                <li className="col-span-1">
                  Diện tích:{' '}
                  <span className="text-baseColor">{data?.area}</span>
                </li> */}
                  </ul>
                </div>
                <div className="mt-[20px]">
                  <p className="text-black-100 text-[18px] font-bold">
                    Giới thiệu
                  </p>
                  <p className="text-[16px] mt-[10px]">{data?.description}</p>
                </div>
                <div className="mt-[20px]">
                  <p className="text-black-100 text-[18px] font-bold">Bản đồ</p>
                  <div className="w-full h-[400px] mt-[10px]">
                    <GoogleMap />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[50px] bg-baseColor rounded-[3px] flex justify-center my-[10px]">
              <p className="text-[24px] text-white font-bold self-center">
                Chọn gói đăng tin
              </p>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(ChoosePostPackagePage, { requiredLogin: true });
