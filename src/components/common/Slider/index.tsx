import React from 'react';
import Slider, { Settings } from 'react-slick';

interface SliderCustomProps {
  children: Array<React.ReactNode> | React.ReactNode;
  customSettings: Settings;
}

const SliderCustom = (props: SliderCustomProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    // slidesToShow: 3,
    // slidesToScroll: 2,
    adaptiveHeight: true,
    // lazyLoad: 'progressive',
  };
  const { children, customSettings } = props;
  const sliderSettings = { ...settings, ...customSettings };
  return <Slider {...sliderSettings}>{children}</Slider>;
};

export default SliderCustom;
