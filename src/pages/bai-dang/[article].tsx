import SliderCustom from '@/components/common/Slider';
import SliderArrow from '@/components/common/Slider/SliderArrow';
import LayoutCommon from '@/components/layout/LayoutCommon';
import WidgetLessor from '@/components/pages/bai-dang/WidgetLessor';
import { formatMoney, getLengthArray } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleDetail = () => {
  const [stateArticle, actionArticle] = useArticle();
  const router = useRouter();
  const articleId = router.query.article as string;

  React.useEffect(() => {
    actionArticle.getDetailArticleAsync(articleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

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

const ImageSlide = ({ images }: { images: Array<string> | undefined }) => {
  console.log(images);
  if (images && getLengthArray(images) > 0)
    return (
      <div className="w-full h-[500px] relative border rounded-[5px]">
        <SliderCustom
          customSettings={{
            className: 'h-full w-full relative rounded-[5px]',
            arrows: true,
            prevArrow: (
              <SliderArrow
                heightImage="h-[22px]"
                image="/icons/ic_arr_left.png"
                classNameProps="top-[50%] left-[-40px] w-[60px] h-[60px] bg-black"
              />
            ),
            nextArrow: (
              <SliderArrow
                heightImage="h-[22px]"
                image="/icons/ic_arr_right.png"
                classNameProps="top-[50%] right-[-40px] w-[60px] h-[60px] bg-black"
              />
            ),
            slidesToShow: 1,
            slidesToScroll: 1,
          }}
        >
          {images.map((item, index) => {
            return (
              <div className="h-[500px]" key={index}>
                <img
                  src={item}
                  className="h-full w-full object-cover"
                  alt="image"
                />
              </div>
            );
          })}
        </SliderCustom>
      </div>
    );
  else
    return (
      <div className="w-full h-[500px] relative">
        <div className="h-[500px]">
          <img
            src="/images/img_no_image.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>
    );
};

export default Authentication(ArticleDetail, { requiredLogin: false });
