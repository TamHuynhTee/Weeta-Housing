import React from 'react';

interface ErrorTextProps {
  children: React.ReactNode;
}

const CardArticle = (props: ErrorTextProps) => {
  const { children } = props;
  return (
    <div className="flex items-center gap-x-[10px] pt-[3px]">
      <div className="w-[16px] h-[16px]">
        <img src="/icons/ic_error.png" alt="" />
      </div>
      <p className="text-[15px] font-normal text-[rgb(249_80_61)]">
        {children}
      </p>
    </div>
  );
};

export default CardArticle;
