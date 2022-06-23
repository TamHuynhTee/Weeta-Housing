import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { formatChannelMessageTime } from '@/helpers/base.helpers';
import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import React from 'react';

type Props = {
  isSelected: boolean;
  authId: string;
  data: CONVERSATION_MODEL;
  handleSelect: (id: string, conversation: CONVERSATION_MODEL) => void;
};

const CardChannel = (props: Props) => {
  const { isSelected, data, authId, handleSelect } = props;
  const { latestMessage } = data;

  const theOtherMember = data.members.filter((e) => e._id !== authId)[0];

  const setCurrentConversation = React.useCallback(
    function () {
      handleSelect(data._id, data);
    },
    [handleSelect, data]
  );

  return (
    <div
      className={`w-full px-[20px] grid grid-cols-12 gap-x-[10px] h-[80px] cursor-pointer border-b ${
        isSelected && 'bg-white !cursor-default !border-none'
      }`}
      onClick={setCurrentConversation}
    >
      <div className="col-span-9 flex items-center">
        <div className="w-[50px] h-[50px] rounded-[50%] mr-[10px]">
          <img
            src={theOtherMember?.avatar || DEFAULT_AVATAR}
            className="w-full h-full rounded-[50%]"
            alt=""
          />
        </div>
        <div className="flex-1">
          <p className="max_line-1 font-bold text-[18px]">
            {theOtherMember?.fullname}
          </p>
          <p className="max_line-1 font-normal text-[16px]">
            {latestMessage ? (
              latestMessage?.isDelete ? (
                <span className="text-[14px] text-gray-400 italic">
                  Tin nhắn đã được thu hồi
                </span>
              ) : (
                latestMessage?.text
              )
            ) : (
              <span className="italic text-[14px] text-gray-400">
                [Chưa có tin nhắn]
              </span>
            )}
          </p>
        </div>
      </div>
      {latestMessage ? (
        <div className="col-span-3 flex justify-center">
          <p className="text-gray-400 text-[12px] self-center">
            {formatChannelMessageTime(latestMessage.createdAt)}
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CardChannel;
