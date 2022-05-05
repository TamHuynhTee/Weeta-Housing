import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import { CONVERSATION_LIMIT } from '@/pages/tin-nhan';
import { useConversation } from '@/stores/Conversation';
import React from 'react';
import styles from './styles.module.css';
import socketService from '@/services/sockets/baseSocket';
import { DEFAULT_AVATAR, ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';

const BoxChat = () => {
  const [stateConversation, actionConversation] = useConversation();
  const [stateAuth] = useAuth();

  const theOtherMember = stateConversation.conversationDetail?.members.filter(
    (e) => e._id !== stateAuth.auth?._id
  )[0];
  console.log(theOtherMember);

  return (
    <React.Fragment>
      <div className="w-full h-full col-span-2 rounded-tr-[20px] rounded-br-[20px]">
        {/* Header */}
        <div className="h-[60px] px-[20px] w-full border-b grid grid-cols-12 items-center">
          <div className="col-span-1 flex justify-center">
            <div className="w-[40px] h-[40px] rounded-[50%]">
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
        <div className={`h-[calc(100%-90px)] ${styles.scrollbarChannel}`}></div>
      </div>
    </React.Fragment>
  );
};

export default BoxChat;
