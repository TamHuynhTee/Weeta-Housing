import React from 'react';

type Props = {
  text?: string;
};

const NoResults = (props: Props) => {
  const { text = 'Không có kết quả' } = props;
  return (
    <div className="w-full h-[250px] flex flex-col justify-center items-center select-none">
      <div className="w-[140px] h-[140px] opacity-30">
        <img
          src="/images/img_no_result.png"
          alt="no-results"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="mt-[10px] font-bold text-gray-400">{text}</p>
    </div>
  );
};

export default NoResults;
