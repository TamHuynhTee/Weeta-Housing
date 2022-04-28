import LayoutCommon from '@/components/layout/LayoutCommon';
import ImageSlide from '@/components/pages/bai-dang/ImageSlide';
import WidgetLessor from '@/components/pages/bai-dang/WidgetLessor';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleDetail = () => {
  const [stateArticle, actionArticle] = useArticle();
  const router = useRouter();
  const articleId = router.query.article as string;

  React.useEffect(() => {
    actionArticle.getDetailArticleAsync(articleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // return () => actionArticle.setDetailArticle(undefined);
  }, [articleId, actionArticle]);

  React.useEffect(() => {
    return () => {
      if (stateArticle.articleDetail) actionArticle.setDetailArticle(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = stateArticle.articleDetail;
  console.log(stateArticle.articleDetail);

  return (
    <React.Fragment>
      <LayoutCommon title="Bài đăng" isVisibleSearchBar>
        <div className="px-[50px] py-[20px] grid grid-cols-6 gap-[30px] h-full">
          {/* Detail */}
          <div className="col-span-4 h-full w-full">
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
              <p className="text-black-100 text-[18px] font-bold">Giới thiệu</p>
              <p className="text-[16px] mt-[10px]">{data?.description}</p>
            </div>
          </div>
          {/* Lessor */}
          <div className="col-span-2 h-full w-full">
            <WidgetLessor data={data?.lessor} />
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(ArticleDetail, { requiredLogin: false });
