import SliderCustom from '@/components/common/Slider';
import SliderArrow from '@/components/common/Slider/SliderArrow';
import { getLengthArray } from '@/helpers/base.helpers';
import React from 'react';

const ImageSlide = ({ images }: { images: Array<string> | undefined }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  if (images && getLengthArray(images) > 0)
    return (
      <div className="w-full h-[500px] relative border rounded-[5px] bg-white-100">
        <SliderCustom
          customSettings={{
            className: 'h-full w-full relative rounded-[5px]',
            arrows: true,
            prevArrow: (
              <SliderArrow
                heightImage="h-[22px]"
                image="/icons/ic_arr_left.png"
                classNameProps="top-[50%] left-[10px] w-[60px] h-[60px] bg-black"
              />
            ),
            nextArrow: (
              <SliderArrow
                heightImage="h-[22px]"
                image="/icons/ic_arr_right.png"
                classNameProps="top-[50%] right-[10px] w-[60px] h-[60px] bg-black"
              />
            ),
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: (index) => setCurrentImage(index),
          }}
        >
          {images.map((item, index) => {
            return (
              <div className="h-[500px]" key={index}>
                <img
                  src={item}
                  className="h-full w-full object-contain"
                  alt="image"
                />
              </div>
            );
          })}
        </SliderCustom>
        <div className="absolute h-[30px] min-w-[50px] bg-black opacity-70 bottom-1 left-[50%] translate-x-[-50%] rounded-lg">
          <p className="text-white text-center">
            {currentImage + 1}/{getLengthArray(images)}
          </p>
        </div>
      </div>
    );
  else
    return (
      <div className="w-full h-[500px] border rounded-[5px] bg-white-100 relative">
        <div className="h-[500px]">
          <img
            src="/images/img_no_image.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute h-[30px] min-w-[50px] bg-black opacity-70 bottom-1 left-[50%] translate-x-[-50%] rounded-lg">
          <p className="text-white text-center">0/0</p>
        </div>
      </div>
    );
};

export default React.memo(ImageSlide);
