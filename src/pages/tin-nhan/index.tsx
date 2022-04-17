import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxChannel from '@/components/pages/tin-nhan/BoxChannel';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const ChatPage = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Tin nhắn của tôi" isVisibleFooter={false}>
        <div className="w-full h-[calc(100vh-81px)] px-[50px] py-[20px]">
          <div className="w-full h-full grid grid-cols-7 shadow-[rgba(99,99,99,0.2)_0_2px_8px_0] rounded-[20px]">
            {/* Box channel */}
            <BoxChannel />
            {/* Box chat */}
            <div className="w-full h-full col-span-5 bg-white rounded-tr-[20px] rounded-br-[20px]"></div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

// Home.layout = LayoutCommon;

export default Authentication(ChatPage, { requiredLogin: true });
