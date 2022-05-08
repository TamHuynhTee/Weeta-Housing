import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';
import { useConversation } from '@/stores/Conversation';
import React from 'react';

const BoxChatHeader = () => {
  const [stateConversation] = useConversation();
  const [stateAuth] = useAuth();

  const theOtherMember = stateConversation.conversationDetail?.members.filter(
    (e) => e._id !== stateAuth.authId
  )[0];

  return (
    <div className="h-[80px] px-[20px] w-full border-b grid grid-cols-12 items-center">
      <div className="col-span-1 flex justify-center">
        <div className="w-[50px] h-[50px] rounded-[50%]">
          <img
            src={theOtherMember?.avatar || DEFAULT_AVATAR}
            className="w-full h-full rounded-[50%]"
            alt=""
          />
        </div>
      </div>
      <div className="col-span-10">
        <p className="max_line-1 font-bold text-[18px]">
          {theOtherMember?.fullname}
        </p>
      </div>
      <div className="col-span-1 flex justify-center">
        <div
          className="h-[24px] w-[24px] overflow-hidden cursor-pointer"
          //   onClick={() => {
          //     _setShowDropdown(!_isShowDropdown);
          //   }}
        >
          <img
            src="/icons/ic_3_dots.png"
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default BoxChatHeader;
