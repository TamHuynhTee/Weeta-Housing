import SearchBar from '@/components/common/SearchBar';
import SliderCustom from '@/components/common/Slider';
import LayoutCommon from '@/components/layout/LayoutCommon';
import DistrictFilter from '@/components/pages/thue-tro/DistrictFilter';
import PriceFilter from '@/components/pages/thue-tro/PriceFilter';
import { HOME_BANNER_CAROUSEL } from '@/constants/base.constants';
import Authentication from '@/HOC/auth.hoc';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Weeta Housing" isVisibleSearchBar>
        <div className="w-full">
          <div className="w-full min-h-[calc(100vh-80px)] relative">
            <SliderCustom
              customSettings={{
                dots: true,
                className: 'h-full w-full relative',
                autoplay: true,
                dotsClass: 'slick-dots slick-thumb slick-dots-custom',
                fade: true,
                infinite: true,
                speed: 5000,
                appendDots: (dots) => (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                    }}
                  >
                    <ul style={{ margin: '0px' }}>{dots}</ul>
                  </div>
                ),
                arrows: false,
              }}
            >
              {HOME_BANNER_CAROUSEL.map((item, index) => (
                <div key={index} className="h-[calc(100vh-80px)]">
                  <img
                    src={item}
                    className="h-full w-full object-cover"
                    alt={`home_banner_${index + 1}`}
                  />
                </div>
              ))}
            </SliderCustom>
            <HomeFilter />
          </div>
          <div className="w-full px-[50px] py-[30px]">
            <div className="flex justify-between items-center my-[30px]">
              <p className="text-[25px] font-bold text-[rgb(44_44_44)]">
                Khám phá
              </p>
              <Link href={'/thue-tro'}>
                <a className="text-[15px] hover:text-baseColor text-[rgb(44_44_44)]">
                  Xem tất cả
                </a>
              </Link>
            </div>
            <div className="w-full flex flex-wrap"></div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const HomeFilter = () => {
  return (
    <div className="absolute md:top-[20%] top-[50%] right-[50%] translate-x-[50%] bg-white min-w-[50%] max-w-[80%] rounded-[6px] py-[28px] px-[30px] shadow-[rgb(0_0_0_/_8%)_0_1px_20px]">
      <p className="text-[24px] font-bold">
        Đánh giá sớm nhất. Giá cả tốt nhất.
      </p>
      <p className="text-[15px]">
        Chúng tôi kết nối hơn 200 chủ trọ khắp TPHCM để giúp bạn tìm được nhà
        trọ tốt nhất.
      </p>
      <div className="w-full mt-[10px] grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <SearchBar
            className={`pb-[2 px] w-full h-[40px] text-[16px] text-back-100 placeholder-grey-50 bg-green-100 border-0 outline-none`}
          />
        </div>
        <div className="col-span-1">
          <DistrictFilter />
        </div>
        <div className="col-span-1">
          <PriceFilter />
        </div>
      </div>
    </div>
  );
};

// Home.layout = LayoutCommon;

export default Authentication(Home, { requiredLogin: false });
