import SliderCustom from '@/components/common/Slider';
import LayoutCommon from '@/components/layout/LayoutCommon';
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
              <div className="h-[calc(100vh-80px)]">
                <img
                  src="/images/img_home_image_1.jpg"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="h-[calc(100vh-80px)]">
                <img
                  src="/images/img_home_image_2.jpg"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="h-[calc(100vh-80px)]">
                <img
                  src="/images/img_home_image_3.jpg"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              {/* <div>
            <img src="/images/img_home_image_2.jpg" alt="" />
          </div> */}
            </SliderCustom>
            <div className="absolute md:top-[20%] top-[50%] right-[50%] translate-x-[50%] bg-white min-w-[50%] max-w-[80%] rounded-[6px] py-[28px] px-[30px] shadow-[rgb(0_0_0_/_8%)_0_1px_20px]">
              <p className="text-[24px] font-bold">
                Đánh giá sớm nhất. Giá cả tốt nhất.
              </p>
              <p className="text-[15px]">
                Chúng tôi kết nối hơn 200 chủ trọ khắp TPHCM để giúp bạn tìm
                được nhà trọ tốt nhất.
              </p>
              <div className="w-full mt-[10px]">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="w-full px-[50px] py-[30px]">
            <div className="flex justify-between items-center my-[30px]">
              <p className="text-[25px] font-bold text-[rgb(44_44_44)]">
                Khám phá
              </p>
              <Link href={'#!'}>
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

// Home.layout = LayoutCommon;

export default Authentication(Home, { requiredLogin: false });
